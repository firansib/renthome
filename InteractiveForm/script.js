/* ============================================================
   RentHome – Account Registration
   script.js | Vanilla JavaScript – no frameworks
   ============================================================ */

'use strict';

/* ---------------------------------------------------------- *
 * 1. Element references
 * ---------------------------------------------------------- */
const form            = document.getElementById('register-form');
const successMessage  = document.getElementById('success-message');

const fields = {
  name:    document.getElementById('name'),
  email:   document.getElementById('email'),
  phone:   document.getElementById('phone'),
  password: document.getElementById('password'),
  confirm: document.getElementById('confirm-password'),
};

const groups = {
  name:    document.getElementById('group-name'),
  email:   document.getElementById('group-email'),
  phone:   document.getElementById('group-phone'),
  password: document.getElementById('group-password'),
  confirm: document.getElementById('group-confirm'),
};

const errors = {
  name:    document.getElementById('error-name'),
  email:   document.getElementById('error-email'),
  phone:   document.getElementById('error-phone'),
  password: document.getElementById('error-password'),
  confirm: document.getElementById('error-confirm'),
};

const strengthBar   = document.getElementById('strength-bar');
const strengthLabel = document.getElementById('strength-bar-label');

const togglePassword = document.getElementById('toggle-password');
const eyePassword    = document.getElementById('eye-password');
const eyeOffPassword = document.getElementById('eye-off-password');

const toggleConfirm = document.getElementById('toggle-confirm');
const eyeConfirm    = document.getElementById('eye-confirm');
const eyeOffConfirm = document.getElementById('eye-off-confirm');


/* ---------------------------------------------------------- *
 * 2. Validation helpers
 * ---------------------------------------------------------- */

/**
 * Set an error on a field group.
 * @param {string} fieldKey - key in groups/errors
 * @param {string} message  - error text
 */
function setError(fieldKey, message) {
  const group = groups[fieldKey];
  const error = errors[fieldKey];
  group.classList.add('has-error');
  group.classList.remove('is-valid');
  error.textContent = message;
}

/**
 * Clear error and mark field as valid.
 * @param {string} fieldKey
 */
function setValid(fieldKey) {
  const group = groups[fieldKey];
  const error = errors[fieldKey];
  group.classList.remove('has-error');
  group.classList.add('is-valid');
  error.textContent = '';
}

/**
 * Reset a field group to its neutral state (no error, no valid).
 * @param {string} fieldKey
 */
function setNeutral(fieldKey) {
  const group = groups[fieldKey];
  const error = errors[fieldKey];
  group.classList.remove('has-error', 'is-valid');
  error.textContent = '';
}

/* ---- Individual validators ---- */

/** Returns true when valid, false when not (and calls setError). */
function validateName(showError = true) {
  const value = fields.name.value.trim();
  if (value === '') {
    if (showError) setError('name', 'Full name is required.');
    return false;
  }
  if (value.length < 2) {
    if (showError) setError('name', 'Name must be at least 2 characters.');
    return false;
  }
  if (!/^[A-Za-z\s'\-\.]+$/.test(value)) {
    if (showError) setError('name', 'Name can only contain letters, spaces, hyphens, or apostrophes.');
    return false;
  }
  setValid('name');
  return true;
}

function validateEmail(showError = true) {
  const value = fields.email.value.trim();
  if (value === '') {
    if (showError) setError('email', 'Email address is required.');
    return false;
  }
  // RFC 5322-style simplified regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(value)) {
    if (showError) setError('email', 'Please enter a valid email address (e.g. jane@example.com).');
    return false;
  }
  setValid('email');
  return true;
}

function validatePhone(showError = true) {
  const value = fields.phone.value.trim();
  if (value === '') {
    if (showError) setError('phone', 'Phone number is required.');
    return false;
  }

  // Ethiopian phone number formats:
  //   Local  : 09XX XXX XXX  or  07XX XXX XXX  (10 digits, starts with 09 or 07)
  //   Intl   : +251 9XX XXX XXX  or  +2519XXXXXXXX  (12 digits with +251)
  //   Also   : 251 9XX XXX XXX  (without the +)
  const digits = value.replace(/\D/g, '');

  // Local format: starts with 09 or 07, exactly 10 digits
  const localRegex = /^0[79]\d{8}$/;

  // International format: +251 or 251 followed by 9 digits starting with 9 or 7
  const intlRegex = /^(\+?251)[79]\d{8}$/;

  const stripped = value.replace(/[\s\-]/g, ''); // remove spaces and dashes for matching

  if (!localRegex.test(digits) && !intlRegex.test(stripped.replace(/\s/g, ''))) {
    if (showError) setError('phone', 'Please enter a valid Ethiopian phone number (e.g. 0911 123456 or +251 911 123456).');
    return false;
  }
  setValid('phone');
  return true;
}

/**
 * Evaluate password strength.
 * Returns { score: 0-4, level: 'weak'|'fair'|'strong', missing: string[] }
 */
function evaluatePasswordStrength(password) {
  const checks = {
    length:    password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number:    /[0-9]/.test(password),
  };

  const score   = Object.values(checks).filter(Boolean).length;
  const missing = [];

  if (!checks.length)    missing.push('at least 8 characters');
  if (!checks.uppercase) missing.push('an uppercase letter');
  if (!checks.lowercase) missing.push('a lowercase letter');
  if (!checks.number)    missing.push('a number');

  let level = 'weak';
  if (score === 4)            level = 'strong';
  else if (score >= 2)        level = 'fair';

  return { score, level, missing, checks };
}

function validatePassword(showError = true) {
  const value = fields.password.value;

  if (value === '') {
    if (showError) setError('password', 'Password is required.');
    clearStrengthIndicator();
    return false;
  }

  const { level, missing } = evaluatePasswordStrength(value);

  if (level !== 'strong') {
    if (showError) {
      setError('password', `Password is too weak. Add: ${missing.join(', ')}.`);
    }
    return false;
  }

  setValid('password');
  return true;
}

function validateConfirm(showError = true) {
  const value   = fields.confirm.value;
  const pwValue = fields.password.value;

  if (value === '') {
    if (showError) setError('confirm', 'Please confirm your password.');
    return false;
  }
  if (value !== pwValue) {
    if (showError) setError('confirm', 'Passwords do not match.');
    return false;
  }
  setValid('confirm');
  return true;
}

/** Validate all fields and return true only when all pass. */
function validateAll() {
  const results = [
    validateName(true),
    validateEmail(true),
    validatePhone(true),
    validatePassword(true),
    validateConfirm(true),
  ];
  return results.every(Boolean);
}


/* ---------------------------------------------------------- *
 * 3. Password Strength Indicator
 * ---------------------------------------------------------- */

function updateStrengthIndicator(password) {
  if (password === '') {
    clearStrengthIndicator();
    return;
  }

  const { level, missing } = evaluatePasswordStrength(password);

  strengthBar.setAttribute('data-level', level);
  strengthLabel.setAttribute('data-level', level);

  const labels = {
    weak:   'Weak',
    fair:   'Fair',
    strong: 'Strong',
  };

  let hint = labels[level];
  if (missing.length > 0) {
    hint += ` — add: ${missing.join(', ')}`;
  }
  strengthLabel.textContent = hint;
}

function clearStrengthIndicator() {
  strengthBar.removeAttribute('data-level');
  strengthLabel.removeAttribute('data-level');
  strengthLabel.textContent = '';
}


/* ---------------------------------------------------------- *
 * 4. Password Visibility Toggle
 * ---------------------------------------------------------- */

function setupToggle(toggleBtn, inputEl, eyeOn, eyeOff) {
  toggleBtn.addEventListener('click', function () {
    const isPassword = inputEl.type === 'password';
    inputEl.type = isPassword ? 'text' : 'password';

    eyeOn.classList.toggle('hidden', !isPassword);
    eyeOff.classList.toggle('hidden', isPassword);

    this.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');

    // Keep focus on the input after toggling
    inputEl.focus();
  });
}

setupToggle(togglePassword, fields.password, eyePassword,  eyeOffPassword);
setupToggle(toggleConfirm,  fields.confirm,  eyeConfirm,   eyeOffConfirm);


/* ---------------------------------------------------------- *
 * 5. Real-time (input) events
 * ---------------------------------------------------------- */

// Name – validate while typing after field has been touched
fields.name.addEventListener('input', function () {
  if (groups.name.classList.contains('has-error') || this.value.trim().length > 0) {
    validateName();
  }
});

// Email – validate on input once user starts fixing an error
fields.email.addEventListener('input', function () {
  if (groups.email.classList.contains('has-error') || this.value.trim().length > 0) {
    validateEmail();
  }
});

// Phone
fields.phone.addEventListener('input', function () {
  if (groups.phone.classList.contains('has-error') || this.value.trim().length > 0) {
    validatePhone();
  }
});

// Password – strength bar updates on every keystroke
fields.password.addEventListener('input', function () {
  updateStrengthIndicator(this.value);

  // Re-validate password if it was already in error state
  if (groups.password.classList.contains('has-error')) {
    validatePassword();
  }

  // Keep confirm in sync – re-validate if confirm already has content
  if (fields.confirm.value.length > 0) {
    validateConfirm();
  }
});

// Confirm password – real-time mismatch check
fields.confirm.addEventListener('input', function () {
  if (this.value.length > 0) {
    validateConfirm();
  } else {
    setNeutral('confirm');
  }
});


/* ---------------------------------------------------------- *
 * 6. Focus events – highlight the active field
 * ---------------------------------------------------------- */
Object.values(fields).forEach(function (input) {
  input.addEventListener('focus', function () {
    // The CSS :focus rule handles the border; nothing extra needed.
    // We clear the error hint only when a pristine (neutral) field is focused.
    // Fields already showing errors keep their messages visible.
  });
});


/* ---------------------------------------------------------- *
 * 7. Blur events – validate on leave
 * ---------------------------------------------------------- */
fields.name.addEventListener('blur', function () {
  if (this.value.trim() !== '') {
    validateName();
  } else {
    setNeutral('name');
  }
});

fields.email.addEventListener('blur', function () {
  if (this.value.trim() !== '') {
    validateEmail();
  } else {
    setNeutral('email');
  }
});

fields.phone.addEventListener('blur', function () {
  if (this.value.trim() !== '') {
    validatePhone();
  } else {
    setNeutral('phone');
  }
});

fields.password.addEventListener('blur', function () {
  if (this.value !== '') {
    validatePassword();
  } else {
    setNeutral('password');
    clearStrengthIndicator();
  }
});

fields.confirm.addEventListener('blur', function () {
  if (this.value !== '') {
    validateConfirm();
  } else {
    setNeutral('confirm');
  }
});


/* ---------------------------------------------------------- *
 * 8. Form Submit
 * ---------------------------------------------------------- */
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Never reload the page

  const isValid = validateAll();

  if (!isValid) {
    // Scroll to the first error field
    const firstError = form.querySelector('.field-group.has-error .field-input');
    if (firstError) {
      firstError.focus();
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // ---- Success ----
  showSuccessAndReset();
});

function showSuccessAndReset() {
  // Show success banner
  successMessage.hidden = false;
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Reset the form
  form.reset();

  // Clear all field states and strength indicator
  Object.keys(groups).forEach(setNeutral);
  clearStrengthIndicator();

  // Re-hide the success banner after 5 seconds
  setTimeout(function () {
    successMessage.hidden = true;
  }, 5000);
}
