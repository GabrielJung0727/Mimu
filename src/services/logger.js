const { createLogger, format, transports } = require('winston');
const { LOG_LEVEL } = require('../config/config');

const logger = createLogger({
    level: LOG_LEVEL,
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/bot.log' })
    ]
});

function logInfo(message) {
    logger.info(message);
}

function logError(message) {
    logger.error(message);
}

function logWarn(message) {
    logger.warn(message);
}

module.exports = { logInfo, logError, logWarn };
