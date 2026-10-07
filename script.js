document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const eyeIcon = document.getElementById('eye-icon');
  const eyeOffIcon = document.getElementById('eye-off-icon');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const loginAlert = document.getElementById('login-alert');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');

  // =========================================================================
  // 1. Password Visibility Toggle
  // =========================================================================
  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    const newType = isPassword ? 'text' : 'password';

    passwordInput.setAttribute('type', newType);
    togglePasswordBtn.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
    togglePasswordBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');

    // Toggle icons
    eyeIcon.classList.toggle('hidden', isPassword);
    eyeOffIcon.classList.toggle('hidden', !isPassword);

    // Keep focus on password input
    passwordInput.focus();
  });

  // =========================================================================
  // 2. Validation Helpers
  // =========================================================================
  function validateEmail(email) {
    if (!email.trim()) {
      return 'Email address is required.';
    }
    // Standard RFC-compliant practical email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address.';
    }
    return '';
  }

  function validatePassword(password) {
    if (!password) {
      return 'Password is required.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    return '';
  }

  function setError(inputElement, errorElement, message) {
    const formGroup = inputElement.closest('.form-group');
    if (message) {
      formGroup.classList.add('has-error');
      errorElement.textContent = message;
      inputElement.setAttribute('aria-invalid', 'true');
    } else {
      formGroup.classList.remove('has-error');
      errorElement.textContent = '';
      inputElement.removeAttribute('aria-invalid');
    }
  }

  function showAlert(message, type = 'error') {
    loginAlert.className = `alert ${type}`;
    loginAlert.textContent = message;
    loginAlert.classList.remove('hidden');
  }

  function hideAlert() {
    loginAlert.classList.add('hidden');
    loginAlert.textContent = '';
  }

  // Clear errors in real-time on user input
  emailInput.addEventListener('input', () => {
    if (emailInput.closest('.form-group').classList.contains('has-error')) {
      setError(emailInput, emailError, validateEmail(emailInput.value));
    }
    hideAlert();
  });

  passwordInput.addEventListener('input', () => {
    if (passwordInput.closest('.form-group').classList.contains('has-error')) {
      setError(passwordInput, passwordError, validatePassword(passwordInput.value));
    }
    hideAlert();
  });

  // =========================================================================
  // 3. Form Submission Handling
  // =========================================================================
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlert();

    const email = emailInput.value;
    const password = passwordInput.value;

    const emailValidationMsg = validateEmail(email);
    const passwordValidationMsg = validatePassword(password);

    setError(emailInput, emailError, emailValidationMsg);
    setError(passwordInput, passwordError, passwordValidationMsg);

    // Focus the first invalid field
    if (emailValidationMsg) {
      emailInput.focus();
      return;
    }
    if (passwordValidationMsg) {
      passwordInput.focus();
      return;
    }

    // Set UI to loading state
    setLoading(true);

    // Simulate authentication API request
    setTimeout(() => {
      setLoading(false);

      // Demo validation logic
      // Accepts user@example.com / password123, or any valid inputs for ease of testing
      const isDemoUser = email.trim().toLowerCase() === 'user@example.com';
      const isDemoPassword = password === 'password123';

      if (isDemoUser && !isDemoPassword) {
        showAlert('Incorrect password. For demo, use: password123', 'error');
        passwordInput.focus();
      } else {
        showAlert(`Welcome back, ${email.split('@')[0]}! Login successful.`, 'success');
        // Optional: clear password field after successful sign-in
        passwordInput.value = '';
      }
    }, 900);
  });

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    if (isLoading) {
      btnText.textContent = 'Signing In...';
      btnSpinner.classList.remove('hidden');
    } else {
      btnText.textContent = 'Sign In';
      btnSpinner.classList.add('hidden');
    }
  }
});

