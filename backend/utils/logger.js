const path = require('path');
const { createLogger, transports, format } = require('winston');
require('winston-daily-rotate-file');

const logFolder = path.join(__dirname, '..', 'logs');

const errorTransport = new transports.DailyRotateFile({
    filename: path.join(logFolder, 'error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()   // <- makes JSON readable
    )
});

const combinedTransport = new transports.DailyRotateFile({
    filename: path.join(logFolder, 'combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()   // <- makes JSON readable
    )
});

// Pretty console logs
const consoleFormat = format.printf(info => {
    let msg = `${info.timestamp} ${info.level}: ${info.message}`;

    if (info.level === "error" && info.location && info.location.file) {
        msg += `\nLocation: ${info.location.file}:${info.location.line}:${info.location.column}`;
    }

    return msg;
});

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: () => new Date().toISOString() }),
        format.errors({ stack: true }),
        format.json()
    ),
    transports: [
        errorTransport,
        combinedTransport,
        new transports.Console({
            format: format.combine(
                format.colorize(),
                consoleFormat
            )
        })
    ]
});

module.exports = logger;
