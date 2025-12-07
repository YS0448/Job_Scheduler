// const { logErrorToFile } = require('../utils/logs/logger');

// const errorHandler = (err, req, res, next) => {
//   logErrorToFile(err);

//   // Duplicate entry
//   if (err.code === "ER_DUP_ENTRY") {
//     return res.status(400).json({
//       message: "Duplicate entry: resource already exists."
//     });
//   }

//   // Validation errors (Joi, Yup etc.)
//   if (err.name === "ValidationError") {
//     return res.status(400).json({ message: err.message });
//   }

//   // Database auth error
//   if (err.code === "ER_ACCESS_DENIED_ERROR") {
//     return res.status(500).json({ message: "Database access denied." });
//   }

//   // Fallback
//   return res.status(500).json({
//     message: "Internal Server Error"
//   });
// };

// module.exports = errorHandler;


const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    // Log error with request info
    logger.error('💥 Express Error: %o | %s %s | Body: %o', err, req.method, req.url, req.body);

    // Duplicate entry
    if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Duplicate entry: resource already exists." });
    }

    // Validation errors (Joi, Yup etc.)
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
    }

    // Database auth error
    if (err.code === "ER_ACCESS_DENIED_ERROR") {
        return res.status(500).json({ message: "Database access denied." });
    }

    // Fallback
    return res.status(500).json({ message: "Internal Server Error" });
};

module.exports = errorHandler;
