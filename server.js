const express = require('express');
const path = require('path');
const cors = require('cors');
const { scrapeStudentData, scrapePageData } = require('./scraper');
const crypto = require('crypto');

// In-memory session store: sessionId -> browserContext
const activeSessions = new Map();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Login and scrape API
app.post('/api/login', async (req, res) => {
    const { applicationNumber, password } = req.body;

    if (!applicationNumber || !password) {
        return res.status(400).json({ success: false, message: 'Application number and password are required' });
    }

    try {
        console.log(`Starting scrape for user: ${applicationNumber}`);
        const data = await scrapeStudentData(applicationNumber, password);
        
        if (data && data.success && data.context) {
            // Generate a unique session ID
            const sessionId = crypto.randomBytes(16).toString('hex');
            
            // Store the active browser context
            activeSessions.set(sessionId, data.context);
            
            // Send back session ID but don't serialize the context
            res.json({
                success: true,
                sessionId: sessionId,
                profile: data.profile,
                timetable: data.timetable
            });
        } else {
            res.status(401).json({ success: false, message: data.message || 'Login failed' });
        }
    } catch (error) {
        console.error('Scraping error:', error);
        res.status(500).json({ success: false, message: 'An error occurred while logging in' });
    }
});

// Dynamic Scrape API
app.post('/api/scrape', async (req, res) => {
    const { sessionId, pageName } = req.body;
    
    if (!sessionId || !pageName) {
        return res.status(400).json({ success: false, message: 'Session ID and page name are required' });
    }
    
    const context = activeSessions.get(sessionId);
    if (!context) {
        return res.status(401).json({ success: false, message: 'Session expired or invalid. Please login again.' });
    }
    
    try {
        console.log(`Scraping page: ${pageName} for session: ${sessionId.substring(0, 5)}...`);
        const pageData = await scrapePageData(context, pageName);
        res.json({ success: true, data: pageData });
    } catch (error) {
        console.error(`Error scraping ${pageName}:`, error);
        res.status(500).json({ success: false, message: `Failed to load ${pageName}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
