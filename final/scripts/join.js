// join.js – Join a Hike form page (ES Module)
import { initNav } from './nav.js';

// ── Field validation helpers ─────────────────────────────────────────
const validators = {
  fname: (v) => v.trim().length >= 2 ? '' : 'Please enter your first name (at least 2 characters).',
  lname: (v) => v.trim().length >= 2 ? '' : 'Please enter your last name (at least 2 characters).',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
  trail: (v) => v ? '' : 'Please select a trail.',
  experience: (v) => v ? '' : 'Please select your experience level.',
  date: (v) => {
    if (!v) return 'Please select a date.';
    const selected = new Date(v);
    const today = new Date();
    today.setHours(0,0,0,0);
    return selected >= today ? '' : 'Please select a future date.';
  }
};

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}Error`);
  if (field) field.classList.toggle('invalid', !!message);
  if (errorEl) errorEl.textContent = message;
}

function validateField(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field || !validators[fieldId]) return true;
  const error = validators[fieldId](field.value);
  showError(fieldId, error);
  return !error;
}

// ── Set min date on date input ────────────────────────────────────────
function setMinDate() {
  const dateInput = document.getElementById('date');
  if (!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

// ── Save form progress to localStorage ───────────────────────────────
function saveProgress() {
  const fields = ['fname', 'lname', 'email', 'phone', 'trail', 'experience', 'newsletter'];
  const data = {};
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    data[id] = el.type === 'checkbox' ? el.checked : el.value;
  });
  localStorage.setItem('greentrail_formProgress', JSON.stringify(data));
}

function restoreProgress() {
  const saved = localStorage.getItem('greentrail_formProgress');
  if (!saved) return;
  try {
    const data = JSON.parse(saved);
    Object.entries(data).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.type === 'checkbox') el.checked = value;
      else el.value = value;
    });
  } catch (e) {
    // Ignore corrupt storage
  }
}

// ── Form Submission ───────────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();

  const requiredFields = ['fname', 'lname', 'email', 'trail', 'experience', 'date'];
  const isValid = requiredFields.map(id => validateField(id)).every(Boolean);

  if (!isValid) {
    // Focus first invalid field
    const firstInvalid = requiredFields.find(id => !validateField(id));
    document.getElementById(firstInvalid)?.focus();
    return;
  }

  // Clear saved progress on successful submission
  localStorage.removeItem('greentrail_formProgress');

  // Submit the form (native GET to form-action.html)
  e.target.submit();
}

// ── Inline validation on blur ────────────────────────────────────────
function attachInlineValidation() {
  Object.keys(validators).forEach(id => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener('blur', () => validateField(id));
    field.addEventListener('input', () => {
      if (field.classList.contains('invalid')) validateField(id);
      saveProgress();
    });
  });

  // Save non-validated fields on change
  ['phone', 'message', 'newsletter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', saveProgress);
  });
}

// ── Init ─────────────────────────────────────────────────────────────
initNav();
setMinDate();
restoreProgress();
attachInlineValidation();

const form = document.getElementById('hikeForm');
if (form) form.addEventListener('submit', handleSubmit);