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

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const applicationNumber = applicationNumberInput.value.trim();
  const password = passwordInput.value.trim();
  const captcha = captchaInput.value.trim().toUpperCase();

  if (!applicationNumber || !password) {
    showMessage('Please enter Application Number and Password.');
    return;
  }

  if (captcha !== currentCaptcha) {
    showMessage('Invalid captcha. Please try again.');
    captchaInput.value = '';
    setCaptcha();
    return;
  }

  openDashboard();
});

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

    try {
      // Dynamically import the JS module for the page
      const module = await import(`./js/pages/${pageName}.js`);
      
      // Call render() to get the HTML string
      if (module.render && mainContent) {
        mainContent.innerHTML = module.render();
      }
      
      // Initialize module specific logic if available
      if (module.init) {
        module.init();
      }
      
      // Scroll to the very top of the page when navigating
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if (mainContent) mainContent.scrollTop = 0;
      
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
      }, 50);
      
      // Close sidebar on mobile after clicking
      if (window.innerWidth < 768) {
        sidebar.classList.remove('open');
        backdrop.classList.remove('show');
      }
    } catch (err) {
      console.error(`Failed to load page: ${pageName}`, err);
      if (mainContent) {
        mainContent.innerHTML = `
          <div style="padding:20px; color:red;">
            <h2>Error 404</h2>
            <p>Page module not found or failed to load.</p>
          </div>
        `;
      }
    }
  });
});

// For Profile / Home linking
const profileLinks = document.querySelectorAll('a[title="Profile"], a[href="/"]');
profileLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (mainContent) {
      mainContent.innerHTML = defaultMainHTML;
      const newUaCell = document.getElementById('uaCell');
      if (newUaCell) newUaCell.textContent = navigator.userAgent;
    }
  });
});
