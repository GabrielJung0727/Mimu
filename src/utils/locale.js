const fs = require('fs');
const path = require('path');

const languages = {};

fs.readdirSync(path.join(__dirname, '../config/language')).forEach(file => {
    if (file.endsWith('.json')) {
        const lang = file.replace('.json', '');
        languages[lang] = require(`../config/language/${file}`);
    }
});

function t(lang, key, placeholders = {}) {
    const keys = key.split('.');
    let message = languages[lang] || languages['en'];
    for (const k of keys) {
        if (message[k] !== undefined) message = message[k];
        else return key; // 키가 없을 경우 키 자체 반환
    }
    for (const [placeholder, value] of Object.entries(placeholders)) {
        message = message.replace(`{${placeholder}}`, value);
    }
    return message;
}

module.exports = { t };

const i18n = {
    ko: require('./ko.json'),
    en: require('./en.json'),
};

const t = (lang, key, placeholders = {}) => {
    const keys = key.split('.');
    let value = i18n[lang] || i18n['ko'];
    for (const k of keys) {
        value = value[k];
        if (!value) return key; // Key not found
    }
    Object.entries(placeholders).forEach(([placeholder, replacement]) => {
        value = value.replace(`{${placeholder}}`, replacement);
    });
    return value;
};

module.exports = { t };
