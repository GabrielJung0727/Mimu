const userPlaceholders = require('./userPlaceholders');
const serverPlaceholders = require('./serverPlaceholders');
const channelPlaceholders = require('./channelPlaceholders');
const messagePlaceholders = require('./messagePlaceholders');
const miscPlaceholders = require('./miscPlaceholders');

module.exports = {
    user: userPlaceholders,
    server: serverPlaceholders,
    channel: channelPlaceholders,
    message: messagePlaceholders,
    misc: miscPlaceholders,
};
