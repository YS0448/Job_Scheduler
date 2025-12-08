const logger = require('../utils/logger');

// Extract file, line, column from stack
const getErrorLocation = (stack = "") => {
    const regex = /at .*?\(?(.+\.js):(\d+):(\d+)\)?/;
    const match = stack.match(regex);

    if (!match) {
        return { file: null, line: null, column: null };
    }

    return {
        file: match[1],
        line: match[2],
        column: match[3]
    };
};

// Clean undefined/null fields

const errorHandler = (err, req, res, next) => {
    const location = getErrorLocation(err.stack);

    logger.error({
            message: "Express Error",
            errorName: err.name,
            errorMessage: err.message,
            stack: err.stack,
            location,
            method: req.method,
            url: req.originalUrl,
            body: req.body,
            params: req.params,
            query: req.query,
        });

    if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Duplicate entry: resource already exists." });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
    }

    if (err.code === "ER_ACCESS_DENIED_ERROR") {
        return res.status(500).json({ message: "Database access denied." });
    }

    return res.status(500).json({ message: "Internal Server Error" });
};

module.exports = errorHandler;
