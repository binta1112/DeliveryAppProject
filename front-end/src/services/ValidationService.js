const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Minimum 8, 1 minuscule, 1 majuscule, 1 chiffre
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

const validateLoginForm = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(password)) {
    errors.password = 'Password must be at least eight characters, at least one letter and one number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
const validateRegisterForm = (name, email, password, passwordConfirmation) => {
  const errors = {};

  if (!name) {
    errors.name = 'Name is required';
  }
  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }
  if (!password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(password)) {
    errors.password = 'Password must be at leasteight characters, at least one letter and one number';
  }
  if (!passwordConfirmation) {
    errors.passwordConfirmation = 'Password confirmation is required';
  } else if (password !== passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validationService = {
  validateEmail,
  validatePassword,
  validateLoginForm,
  validateRegisterForm,
};