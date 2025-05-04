// Utility to set a cookie
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString(); // 864e5 = 24*60*60*1000
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Utility to get a cookie
function getCookie(name) {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, val] = cookie.split('=');
    acc[key] = val;
    return acc;
  }, {});
  return cookies[name] ? decodeURIComponent(cookies[name]) : null;
}

// Apply font preferences using CSS variables
function applyPreferences(fontSize, fontColor) {
  document.documentElement.style.setProperty('--fontsize', `${fontSize}px`);
  document.documentElement.style.setProperty('--fontcolor', fontColor);
}

// On page load, apply cookie values if available
window.addEventListener('DOMContentLoaded', () => {
  const savedSize = getCookie('fontsize');
  const savedColor = getCookie('fontcolor');

  const fontSize = savedSize ? parseInt(savedSize) : 16;
  const fontColor = savedColor || '#000000';

  // Set form fields to saved values
  document.getElementById('fontsize').value = fontSize;
  document.getElementById('fontcolor').value = fontColor;

  // Apply them to the page
  applyPreferences(fontSize, fontColor);
});

// Handle form submit to save cookies
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page refresh

  const size = document.getElementById('fontsize').value;
  const color = document.getElementById('fontcolor').value;

  // Save to cookies for 30 days
  setCookie('fontsize', size, 30);
  setCookie('fontcolor', color, 30);

  // Apply changes immediately
  applyPreferences(size, color);
});
