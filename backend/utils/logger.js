const path = require('path');
const { createLogger, transports, format } = require('winston');
require('winston-daily-rotate-file');

// logs folder 
const logFolder = path.join(__dirname, '..', 'logs');

const errorTransport = new transports.DailyRotateFile({
    filename: path.join(logFolder, 'error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const combinedTransport = new transports.DailyRotateFile({
    filename: path.join(logFolder, 'combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: () => new Date().toISOString() // UTC in ISO format
        }),
        format.errors({ stack: true }),
        format.json()
    ),
    transports: [
        errorTransport,
        combinedTransport,
        new transports.Console({ format: format.combine(format.colorize(), format.simple()) })
    ]
});

module.exports = logger;
