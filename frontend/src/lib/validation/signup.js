// lib/validation/signup.js

export function validateSignupForm(form) {
  const errors = {};

  // Full Name
  if (!form.fullName || form.fullName.trim() === "") {
    errors.fullName = "Full Name is required";
  } else if (form.fullName.length < 3) {
    errors.fullName = "Full Name must be at least 3 characters";
  }

  // Email
  if (!form.email || form.email.trim() === "") {
    errors.email = "Email is required";
  } else {
    // simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      errors.email = "Invalid email address";
    }
  }

  // Password
  if (!form.password || form.password.trim() === "") {
    errors.password = "Password is required";
  } 

  // Confirm Password
  if (!form.confirmPassword || form.confirmPassword.trim() === "") {
    errors.confirmPassword = "Confirm Password is required";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
