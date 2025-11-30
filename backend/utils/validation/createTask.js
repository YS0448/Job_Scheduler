    const validateCreateJob=(data)=> {
    const errors = {};

    // Job Name
    if (!data.jobName || data.jobName.trim() === "") {
        errors.jobName = "Job Name is required";
    }

    // Priority
    if (!data.priority || data.priority.trim() === "") {
        errors.priority = "Priority is required";
    }

    // Description
    if (!data.description || data.description.trim() === "") {
        errors.description = "Description is required";
    }

    return errors;
    }

    module.exports = {validateCreateJob}