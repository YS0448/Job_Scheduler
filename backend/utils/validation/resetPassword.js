const validateResetPassword = (data) => {
  const errors = {};

  // Email
  if (!data.email || data.email?.trim() === "") {
    errors.jobName = "Email is required";
  }

  // Password
  if (!data.newPassword) {
    errors.password = "New password is required";
  }

  // Token
  if (!data.resetToken) {
    errors.token = "Token is required";
  }

  return errors;
};

module.exports = { validateResetPassword };
