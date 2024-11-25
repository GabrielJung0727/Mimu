require('dotenv').config();

module.exports = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    DATABASE_URI: process.env.DATABASE_URI,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DEFAULT_PREFIX: process.env.DEFAULT_PREFIX || '/',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};
