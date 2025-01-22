function showpw() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
  
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
  
      eyeIcon.innerHTML = `
        <path d="M17.94 17.94A10.94 10.94 0 0 0 12 16c-7 0-11-8-11-8a21.39 21.39 0 0 1 4.46-5.94"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      `;
    } else {
      passwordInput.type = 'password';
  
      eyeIcon.innerHTML = `
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      `;
    }
  }


document.querySelector('.registration-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  let isValid = true;
  const errors = [];

  //name ok valid
  const nameInput = document.querySelector('input[placeholder="Name *"]');
  if (nameInput.value.trim().length < 2) {
      isValid = false;
      showError(nameInput, 'Name must be at least 2 characters long');
      errors.push('Invalid name');
  } else {
      removeError(nameInput);
  }

  //mail
  const emailInput = document.querySelector('input[placeholder="Email address *"]');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
      isValid = false;
      showError(emailInput, 'Please enter a valid email address');
      errors.push('Invalid email');
  } else {
      removeError(emailInput);
  }

  // 9841
  const phoneInput = document.querySelector('input[placeholder="Phone *"]');
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  if (!phoneRegex.test(phoneInput.value.trim())) {
      isValid = false;
      showError(phoneInput, 'Please enter a valid phone number');
      errors.push('Invalid phone');
  } else {
      removeError(phoneInput);
  }

  const passwordInput = document.getElementById('password');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(passwordInput.value)) {
      isValid = false;
      showError(passwordInput, 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character');
      errors.push('Invalid password');
  } else {
      removeError(passwordInput);
  }

  const termsCheckbox = document.getElementById('terms');
  if (!termsCheckbox.checked) {
      isValid = false;
      showError(termsCheckbox, 'Please accept the terms');
      errors.push('Terms not accepted');
  } else {
      removeError(termsCheckbox);
  }

  if (isValid) {
      console.log('Form submitted successfully');
      this.reset();
      showSuccessMessage();
  }
});

// error handling
function showError(input, message) {
  const formGroup = input.closest('.input-group') || input.closest('.terms');
  const existingError = formGroup.querySelector('.error-message');
  
  if (!existingError) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      formGroup.appendChild(errorDiv);
  }
  
  input.style.borderColor = '#ff3b3b';
  if (input.nextElementSibling && input.nextElementSibling.classList.contains('underline')) {
      input.nextElementSibling.style.backgroundColor = '#ff3b3b';
  }
}

function removeError(input) {
  const formGroup = input.closest('.input-group') || input.closest('.terms');
  const error = formGroup.querySelector('.error-message');
  if (error) {
      error.remove();
  }
  
  input.style.borderColor = '';
  if (input.nextElementSibling && input.nextElementSibling.classList.contains('underline')) {
      input.nextElementSibling.style.backgroundColor = '#00e5bd';
  }
}

function showSuccessMessage() {
  const existingSuccess = document.querySelector('.success-message');
  if (existingSuccess) {
      existingSuccess.remove();
  }

  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = 'Registration successful!';
  document.querySelector('.form-container').appendChild(successDiv);

  setTimeout(() => {
      successDiv.remove();
  }, 3000);
}

document.querySelectorAll('.registration-form input').forEach(input => {
  input.addEventListener('blur', function() {
      if (this.required && !this.value) {
          showError(this, 'This field is required');
      }
  });

  input.addEventListener('input', function() {
      if (this.value) {
          removeError(this);
      }
  });
});
  