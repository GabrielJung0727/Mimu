const { t } = require('./locale');

function buildCommand(lang, data) {
    const localizedData = {
        name: data.name,
        description: t(lang, data.descriptionKey),
        options: data.options.map(option => ({
            ...option,
            description: t(lang, option.descriptionKey)
        }))
    };
    return localizedData;
}

module.exports = { buildCommand };
