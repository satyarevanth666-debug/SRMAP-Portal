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
