// form-action.js – Form action / confirmation page (ES Module)
import { initNav } from './nav.js';

// ── Label map for display ──────────────────────────────────────────
const labels = {
  fname: 'First Name',
  lname: 'Last Name',
  email: 'Email Address',
  phone: 'Phone Number',
  trail: 'Selected Trail',
  experience: 'Experience Level',
  date: 'Preferred Date',
  message: 'Additional Notes',
  newsletter: 'Newsletter Subscription'
};

// ── Format date for display ────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const d = new Date(Number(year), Number(month) - 1, Number(day));
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// ── Render form data ───────────────────────────────────────────────
function renderConfirmation() {
  const params = new URLSearchParams(window.location.search);
  const confirmData = document.getElementById('confirmData');

  if (!confirmData) return;

  // Check if we have actual data
  if (![...params.keys()].length) {
    confirmData.innerHTML = '<dd>No form data found. Please <a href="join.html">fill out the registration form</a>.</dd>';
    return;
  }

  // Use array method: map over label keys to build DL entries
  const entries = Object.keys(labels)
    .filter(key => params.has(key) && params.get(key))
    .map(key => {
      let value = params.get(key);

      // Format special fields
      if (key === 'date') value = formatDate(value);
      if (key === 'newsletter') value = value === 'yes' ? 'Yes – subscribed' : 'No';

      return `<dt>${labels[key]}</dt><dd>${value}</dd>`;
    });

  if (entries.length === 0) {
    confirmData.innerHTML = '<dd>No data to display.</dd>';
    return;
  }

  confirmData.innerHTML = entries.join('');
}

// ── Init ────────────────────────────────────────────────────────────
initNav();
renderConfirmation();
