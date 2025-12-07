export function validateLoginForm(form) {
  const errors = {};

  // Email
  if (!form.email || form.email?.trim() === "") {
    errors.email = "Email is required";
  } else {
    // simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      errors.email = "Invalid email address";
    }
  }

  // Password
  if (!form.password || form.password?.trim() === "") {
    errors.password = "Password is required";
  }

  return errors;
}
