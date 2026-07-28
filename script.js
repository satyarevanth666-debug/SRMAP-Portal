const form = document.querySelector('.login-form');
const applicationNumberInput = document.getElementById('applicationNumber');
const passwordInput = document.getElementById('password');
const captchaInput = document.getElementById('captchaInput');
const captchaDisplay = document.getElementById('captchaDisplay');
const formMessage = document.getElementById('formMessage');
const passwordToggle = document.querySelector('.password-toggle');
const eyeIcon = document.querySelector('.eye-icon');
const loginPage = document.getElementById('loginPage');
const dashboardPage = document.getElementById('dashboardPage');

const captchaChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
let currentCaptcha = '';

function generateCaptcha() {
  const letter = captchaChars[Math.floor(Math.random() * captchaChars.length)];
  const num = 1000 + Math.floor(Math.random() * 9000);
  return `${letter}${num}`;
}

function setCaptcha() {
  currentCaptcha = generateCaptcha();
  captchaDisplay.textContent = currentCaptcha;
}

function showMessage(message) {
  formMessage.textContent = message;
  formMessage.classList.add('is-visible');
}

function clearMessage() {
  formMessage.textContent = '';
  formMessage.classList.remove('is-visible');
}

function openDashboard() {
  loginPage.classList.add('hidden');
  dashboardPage.classList.remove('hidden');
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

setCaptcha();

captchaDisplay.addEventListener('click', setCaptcha);
captchaDisplay.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    setCaptcha();
  }
});

passwordToggle.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  eyeIcon.textContent = isPassword ? '🙈' : '👁';
});

[applicationNumberInput, passwordInput, captchaInput].forEach((field) => {
  field.addEventListener('input', clearMessage);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const applicationNumber = applicationNumberInput.value.trim();
  const password = passwordInput.value.trim();
  const captcha = captchaInput.value.trim().toUpperCase();

  if (!applicationNumber || !password) {
    showMessage('Please enter Application Number and Password.');
    return;
  }

  // We can still use the frontend captcha as a simple bot check, or remove it.
  // For now, let's just bypass it if it's correct so the user experience doesn't change.
  if (captcha !== currentCaptcha) {
    showMessage('Invalid captcha. Please try again.');
    captchaInput.value = '';
    setCaptcha();
    return;
  }

  const submitButton = form.querySelector('.login-button');
  const originalButtonText = submitButton.textContent;
  
  try {
    // Show loading state
    submitButton.textContent = 'Logging in... (This takes a few seconds)';
    submitButton.disabled = true;
    showMessage('Solving captcha and fetching your data from the real portal...');

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationNumber, password })
    });

    const data = await response.json();

    if (data.success && data.profile) {
      // Update UI with real data
      updateProfileData(data.profile);
      
      // Save timetable data globally for the timetable view
      if (data.timetable) {
        window.globalTimetableData = data.timetable;
      }
      
      // Save session ID for dynamic scraping
      if (data.sessionId) {
        window.sessionId = data.sessionId;
      }
      
      clearMessage();
      openDashboard();
    } else {
      showMessage(data.message || 'Login failed.');
      setCaptcha();
      captchaInput.value = '';
      passwordInput.value = '';
    }
  } catch (error) {
    showMessage('Could not connect to the backend server. Is it running?');
    console.error(error);
  } finally {
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  }
});

function updateProfileData(profile) {
  // Find all rows in the profile table
  const rows = document.querySelectorAll('.profile-table tbody tr');
  
  rows.forEach(row => {
    const labelCell = row.querySelector('.lbl');
    const valueCell = row.querySelector('.val');
    
    if (labelCell && valueCell) {
      const labelText = labelCell.textContent.trim();
      // Match the label from the scraped data keys (which we trimmed of colons)
      const dataValue = profile[labelText] || profile[labelText.replace('.', '')]; 
      
      if (dataValue !== undefined) {
        // Keep any inner HTML like the verified span if it existed, or just replace text.
        // Actually, just replacing text is safer for scraped data.
        valueCell.textContent = dataValue;
      }
    }
  });

  // Also update the sidebar and header name if "Student Name" exists
  const studentName = profile['Student Name'] || profile['Name'];
  if (studentName) {
    const userNames = document.querySelectorAll('.user-name, .sidebar-welcome strong');
    userNames.forEach(el => el.textContent = studentName);
  }
}

const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
if (forgotPasswordBtn) {
  forgotPasswordBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    const applicationNumber = applicationNumberInput.value.trim();
    const captcha = captchaInput.value.trim().toUpperCase();

    if (!applicationNumber) {
      showMessage('Please enter Application Number / Register Number for Forgot Password.');
      return;
    }

    if (captcha !== currentCaptcha) {
      showMessage('Invalid captcha. Please try again.');
      captchaInput.value = '';
      setCaptcha();
      return;
    }

    const profileRows = document.querySelectorAll('.profile-table tr');
    let mobileNumber = 'your registered mobile number';
    
    profileRows.forEach(row => {
      if (row.textContent.includes('Student Contact Number')) {
        const valCell = row.querySelector('.val');
        if (valCell) {
          const numberMatch = valCell.textContent.match(/\d{10}/);
          if (numberMatch) {
            mobileNumber = numberMatch[0];
          }
        }
      }
    });
    
    alert(`An OTP has been sent to ${mobileNumber}`);
  });
}

const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('backdrop');
const menuToggle = document.getElementById('menuToggle');
const chip = document.getElementById('userChip');
const menu = document.getElementById('userMenu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    backdrop.classList.toggle('show');
  });
}

if (backdrop) {
  backdrop.addEventListener('click', () => {
    sidebar.classList.remove('open');
    backdrop.classList.remove('show');
  });
}

document.querySelectorAll('.sidebar-nav li.has-sub > button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const li = btn.parentElement;
    const wasOpen = li.classList.contains('open');
    document.querySelectorAll('.sidebar-nav li.has-sub').forEach((x) => x.classList.remove('open'));
    if (!wasOpen) li.classList.add('open');
  });
});

if (chip && menu) {
  chip.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('open');
  });
  document.addEventListener('click', () => menu.classList.remove('open'));
}

const uaCell = document.getElementById('uaCell');
if (uaCell) {
  uaCell.textContent = navigator.userAgent;
}

// Router Logic
const mainContent = document.querySelector('.main');
const defaultMainHTML = mainContent ? mainContent.innerHTML : '';

document.querySelectorAll('a[data-page]').forEach(link => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    const pageName = link.getAttribute('data-page');
    if (!pageName) return;

    // Custom interception for Timetable view
    if (pageName === 'timetable') {
      document.getElementById('profile-view').classList.add('hidden');
      document.getElementById('dynamic-content-view').classList.add('hidden');
      document.getElementById('timetable-view').classList.remove('hidden');
      
      renderTimetable(window.globalTimetableData);
      
      // Close sidebar on mobile after clicking
      if (window.innerWidth < 768) {
        sidebar.classList.remove('open');
        backdrop.classList.remove('show');
      }
      return;
    }

    // Hide all views first
    document.getElementById('profile-view').classList.add('hidden');
    document.getElementById('timetable-view').classList.add('hidden');
    document.getElementById('dynamic-content-view').classList.remove('hidden');
    
    const dynamicTitle = document.getElementById('dynamic-page-title');
    const dynamicSpinner = document.getElementById('dynamic-loading-spinner');
    const dynamicTables = document.getElementById('dynamic-tables-container');
    
    // Set title and show spinner
    dynamicTitle.textContent = link.innerText.trim().toUpperCase();
    dynamicSpinner.classList.remove('hidden');
    dynamicTables.innerHTML = '';
    
    // Close sidebar on mobile after clicking
    if (window.innerWidth < 768) {
      sidebar.classList.remove('open');
      backdrop.classList.remove('show');
    }

    try {
      if (!window.sessionId) {
        throw new Error('No active session found. Please login again.');
      }
      
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: window.sessionId, pageName: pageName })
      });
      
      const resData = await response.json();
      
      if (resData.success && resData.data) {
        dynamicSpinner.classList.add('hidden');
        renderDynamicTables(resData.data, pageName);
      } else {
        throw new Error(resData.message || 'Failed to fetch data');
      }
      
    } catch (err) {
      console.error(`Failed to load page: ${pageName}`, err);
      dynamicSpinner.classList.add('hidden');
      dynamicTables.innerHTML = `
        <div style="padding:20px; color:red; text-align: center;">
          <h2>Error</h2>
          <p>${err.message}</p>
        </div>
      `;
    }
  });
});

// Helper to render dynamic generic tables matching SRM original designs
function renderDynamicTables(tables, pageName = '') {
  const container = document.getElementById('dynamic-tables-container');
  
  if (!tables || tables.length === 0) {
    container.innerHTML = '<p style="text-align: center; margin-top: 20px; font-weight: 600;">No data available for this page.</p>';
    return;
  }
  
  // Determine table class based on pageName
  let tableClass = 'data-table table-dark-header';
  const page = pageName.toLowerCase();
  
  if (page.includes('hostel') || page.includes('room')) {
    tableClass = 'data-table table-green-header';
  } else if (page.includes('fee') || page.includes('payment') || page.includes('bank')) {
    tableClass = 'data-table table-blue-header';
  }
  
  let html = '';
  tables.forEach(tableData => {
    html += `<div class="table-responsive"><table class="${tableClass}">`;
    tableData.forEach((row, i) => {
      if (i === 0) {
        html += '<thead><tr>';
        row.forEach(cell => {
          html += `<th class="dark-row">${cell}</th>`; // Added dark-row for specific CSS
        });
        html += '</tr></thead><tbody>';
      } else {
        html += '<tr>';
        row.forEach(cell => {
          html += `<td>${cell}</td>`;
        });
        html += '</tr>';
      }
    });
    if (tableData.length > 0) {
      html += '</tbody>';
    }
    html += '</table></div>';
  });
  
  container.innerHTML = html;
}

// For Profile / Home linking
const profileLinks = document.querySelectorAll('a[title="Profile"], a[href="/"]');
profileLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (mainContent) {
      // mainContent.innerHTML = defaultMainHTML; // We don't overwrite innerHTML anymore so we don't lose the DOM
      document.getElementById('profile-view').classList.remove('hidden');
      document.getElementById('timetable-view').classList.add('hidden');
      document.getElementById('dynamic-content-view').classList.add('hidden');
      
      const newUaCell = document.getElementById('uaCell');
      if (newUaCell) newUaCell.textContent = navigator.userAgent;
      
      // Close sidebar on mobile
      if (window.innerWidth < 768) {
        sidebar.classList.remove('open');
        backdrop.classList.remove('show');
      }
    }
  });
});

// Helper to render the timetable HTML
function renderTimetable(data) {
  const gridContainer = document.getElementById('timetable-grid-container');
  const subjectsContainer = document.getElementById('timetable-subjects-container');
  
  if (!data || (!data.schedule && !data.subjects)) {
    gridContainer.innerHTML = '<p>No timetable data available.</p>';
    subjectsContainer.innerHTML = '';
    return;
  }
  
  // Render Schedule Grid
  if (data.schedule && data.schedule.length > 0) {
    let gridHtml = '<div class="table-responsive"><table class="timetable-grid">';
    data.schedule.forEach((row, i) => {
      gridHtml += '<tr>';
      row.forEach((cell, j) => {
        const isHeader = (i === 0 || cell.includes('To'));
        if (isHeader) {
          gridHtml += `<th>${cell}</th>`;
        } else if (j === 0) {
          // Day column (Monday, etc.), no pill styling
          gridHtml += `<td>${cell}</td>`;
        } else {
          // Wrap subjects in a pill for styling
          const cellContent = cell ? `<span class="subject-pill">${cell}</span>` : '';
          gridHtml += `<td>${cellContent}</td>`;
        }
      });
      gridHtml += '</tr>';
    });
    gridHtml += '</table></div>';
    gridContainer.innerHTML = gridHtml;
  }
  
  // Render Subjects Details
  if (data.subjects && data.subjects.length > 0) {
    let subjectsHtml = '<div class="table-responsive mt-20"><table class="subjects-grid">';
    data.subjects.forEach((row, i) => {
      subjectsHtml += '<tr>';
      row.forEach(cell => {
        if (i === 0) {
          subjectsHtml += `<th>${cell}</th>`;
        } else {
          subjectsHtml += `<td>${cell}</td>`;
        }
      });
      subjectsHtml += '</tr>';
    });
    subjectsHtml += '</table></div>';
    subjectsContainer.innerHTML = subjectsHtml;
  }
}
