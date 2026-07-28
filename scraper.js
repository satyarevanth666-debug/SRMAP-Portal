const { chromium } = require('playwright');
const Tesseract = require('tesseract.js');

let globalBrowser = null;
let globalWorker = null;
let initialized = false;

async function init() {
    if (initialized) return;
    console.log('Initializing global browser and OCR worker...');
    
    // Launch browser once
    globalBrowser = await chromium.launch({ headless: true });
    
    // Create and initialize Tesseract worker once
    globalWorker = await Tesseract.createWorker('eng');
    await globalWorker.setParameters({
        tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    });
    
    initialized = true;
    console.log('Global browser and OCR worker initialized.');
}

// Call init immediately (it runs in background when required)
init();

async function solveCaptcha(page) {
    const captchaElement = await page.locator('img[src="/srmapstudentcorner/captchas"]');
    await captchaElement.waitFor();
    const screenshotBuffer = await captchaElement.screenshot();
    
    // Use the global worker for instant OCR
    const result = await globalWorker.recognize(screenshotBuffer);
    
    const text = result.data.text.replace(/[^A-Z0-9]/g, '').trim();
    return text;
}

async function scrapeStudentData(applicationNumber, password) {
    if (!initialized) await init();
    
    const context = await globalBrowser.newContext();
    const page = await context.newPage();
    
    // Allow all resources to load normally to prevent breaking the page
    
    try {
        let attempts = 0;
        const maxAttempts = 3;
        let loginSuccess = false;
        
        while (attempts < maxAttempts && !loginSuccess) {
            attempts++;
            console.log(`Login attempt ${attempts}...`);
            
            // Standard wait
            await page.goto('https://student.srmap.edu.in/srmapstudentcorner/HRDSystem');
            await page.waitForLoadState('networkidle');
            
            await page.fill('#UserName', applicationNumber);
            await page.fill('#AuthKey', password);
            
            const captchaText = await solveCaptcha(page);
            await page.fill('#ccode', captchaText);
            
            // Standard wait for navigation
            const navigationPromise = page.waitForNavigation().catch(() => null);
            await page.click('button[type="submit"]');
            await navigationPromise;
            
            // Wait for either the profile table to load or an error message to appear
            try {
                await page.waitForFunction(() => {
                    const table = document.querySelector('table');
                    const msg = document.getElementById('divmsg');
                    return table || (msg && msg.innerText.trim().length > 0);
                }, { timeout: 15000 });
            } catch (e) {
                console.log('Timeout waiting for login response');
            }
            
            const currentUrl = page.url();
            if (currentUrl.includes('StudentProfile') || currentUrl.includes('Dashboard') || await page.locator('table').count() > 0) {
                loginSuccess = true;
                break;
            } else {
                const msg = await page.evaluate(() => {
                    const el = document.getElementById('divmsg');
                    return el ? el.innerText : '';
                });
                
                if (msg) {
                    if (msg.includes('Invalid Captcha') || msg.toLowerCase().includes('captcha')) {
                        console.log('Invalid captcha, retrying...');
                        continue;
                    } else if (msg.includes('Invalid') || msg.includes('Password') || msg.includes('Register')) {
                        await context.close();
                        return { success: false, message: 'Invalid Application Number or Password' };
                    }
                }
            }
        }
        
        if (!loginSuccess) {
            await context.close();
            return { success: false, message: 'Failed to login after multiple captcha attempts. Please try again.' };
        }
        
        console.log('Login successful! Scraping profile data...');
        await page.waitForSelector('table');
        
        const profileData = await page.evaluate(() => {
            const data = {};
            const rows = document.querySelectorAll('table tr');
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length >= 2) {
                    let key = cells[0].innerText.trim().replace(/:/g, '');
                    let value = cells[cells.length - 1].innerText.trim();
                    if(key) data[key] = value;
                }
            });
            return data;
        });
        
        console.log('Navigating to Time Table...');
        try {
            // Use evaluate to bypass visibility checks if it's hidden in a dropdown
            await page.evaluate(() => {
                const links = Array.from(document.querySelectorAll('a'));
                const ttLink = links.find(l => l.innerText.trim() === 'Time Table' || l.innerText.trim() === 'Timetable');
                if (ttLink) {
                    ttLink.click();
                } else {
                    console.log('Could not find link in DOM');
                }
            });
            await page.waitForTimeout(2000); // Give the AJAX a moment to render the tables
        } catch (e) {
            console.log('Could not click Time Table link.', e);
        }
        
        console.log('Scraping Time Table data...');
        const timetableData = await page.evaluate(() => {
            const data = {
                schedule: [],
                subjects: []
            };
            
            // Assume the main content area has the new tables
            // Profile page usually has 1 table. Timetable has 2.
            const tables = document.querySelectorAll('table');
            
            if (tables.length >= 2) {
                // Parse schedule table (first table in the view)
                // We'll just grab the last two tables in case there are header tables
                const scheduleTable = tables[tables.length - 2];
                const subjectTable = tables[tables.length - 1];
                
                scheduleTable.querySelectorAll('tr').forEach(row => {
                    const rowData = [];
                    row.querySelectorAll('td, th').forEach(cell => {
                        rowData.push(cell.innerText.trim());
                    });
                    if (rowData.length > 0) data.schedule.push(rowData);
                });
                
                subjectTable.querySelectorAll('tr').forEach(row => {
                    const rowData = [];
                    row.querySelectorAll('td, th').forEach(cell => {
                        rowData.push(cell.innerText.trim());
                    });
                    if (rowData.length > 0) data.subjects.push(rowData);
                });
            }
            return data;
        });
        // We DO NOT close the context here anymore, as we need it for dynamic scraping
        return { 
            success: true, 
            profile: profileData,
            timetable: timetableData,
            context: context  // Return the context to the server
        };
        
    } catch (error) {
        console.error('Error during scraping:', error);
        if (context) await context.close();
        return { success: false, message: 'Internal scraping error' };
    }
}

async function scrapePageData(context, pageName) {
    const page = context.pages()[0]; // Get the active page
    
    // Map of front-end page names to their actual link text in the SRM Portal
    const linkMap = {
        'studentWiseSubjects': 'Student Wise Subjects',
        'attendanceDetails': 'Attendance Details',
        'odMlDetails': 'OD/ML Details',
        'studentAttendance': 'Student Attendance',
        'courseRegistration': 'Course Registration',
        'eventAttendance': 'Event Attendance',
        'sapProcess': 'SAP Process',
        'withdraw': 'Withdraw',
        'details': 'Details',
        'attachments': 'Attachments',
        'feedback': 'Feedback',
        'feePaidDetails': 'Fee Paid Details',
        'feeDueDetails': 'Fee Due Details',
        'onlinePaymentVerification': 'Online Payment Verification',
        'paymentAcknowledgment': 'Payment Acknowledgment',
        'bankAccountDetails': 'Bank Account Details',
        'internalMarks': 'Internal Marks',
        'earlierInternalMarks': 'Earlier Internal Marks',
        'currentSemesterResults': 'Current Semester Results',
        'examMarkDetails': 'Exam Mark Details',
        'examRegistartion': 'Exam Registartion',
        'examRegistrationDetails': 'Exam Registration Details',
        'degreePhotoUpload': 'Degree Photo Upload',
        'hostelBookingForFullYear': 'Hostel Booking for Full Year',
        'roomDeatils': 'Room Deatils',
        'hostelRefundPolicy': 'Hostel Refund Policy',
        'hostelRulesAndRegulations': 'Hostel Rules and Regulations',
        'transportRegistration': 'Transport Registration',
        'registrationAcknowledgment': 'Registration Acknowledgment',
        'transportRefundPolicy': 'Transport Refund Policy',
        'endSemesterFeedback': 'End Semester Feedback'
    };
    
    const targetText = linkMap[pageName];
    if (!targetText) throw new Error(`Unknown page: ${pageName}`);
    
    // Use evaluate to click the link, bypassing dropdown visibility issues
    const clicked = await page.evaluate((text) => {
        const links = Array.from(document.querySelectorAll('a, span, div'));
        // Try exact match case insensitive first
        let target = links.find(l => l.innerText && l.innerText.trim().toLowerCase() === text.toLowerCase());
        
        // Try includes match
        if (!target) {
            target = links.find(l => l.innerText && l.innerText.toLowerCase().includes(text.toLowerCase()) && l.tagName === 'A');
        }
        
        if (target) {
            target.click();
            return true;
        }
        return false;
    }, targetText);
    
    if (!clicked) {
        throw new Error(`Could not find the link for '${targetText}' in the portal menu.`);
    }
    
    // Wait for a loading indicator to disappear, or wait for tables to change
    try {
        await page.waitForLoadState('networkidle', { timeout: 3000 });
    } catch(e) {}
    
    // Wait for at least one table to appear, up to 4 seconds
    try {
        await page.waitForFunction(() => document.querySelectorAll('table').length > 0, { timeout: 4000 });
    } catch(e) {}
    
    // Fallback static wait for slow renders
    await page.waitForTimeout(1500);
    
    // Scrape all tables on the newly loaded page
    const scrapedTables = await page.evaluate(() => {
        const result = [];
        const tables = document.querySelectorAll('table');
        
        tables.forEach((table, tableIndex) => {
            const tableData = [];
            table.querySelectorAll('tr').forEach(row => {
                const rowData = [];
                row.querySelectorAll('th, td').forEach(cell => {
                    rowData.push(cell.innerText.trim());
                });
                if (rowData.length > 0) tableData.push(rowData);
            });
            if (tableData.length > 0) result.push(tableData);
        });
        
        return result;
    });
    
    return scrapedTables;
}

module.exports = { scrapeStudentData, scrapePageData };
