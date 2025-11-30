export function validateCreateJob(form) {
  const errors = {};

  // Job Name
  if (!form.jobName || form.jobName.trim() === "") {
    errors.jobName = "Job Name is required";
  }

  // Priority
  if (!form.priority || form.priority.trim() === "") {
    errors.priority = "Priority is required";
  }

  // Description
  if (!form.description || form.description.trim() === "") {
    errors.description = "Description is required";
  }

  return errors;
}
