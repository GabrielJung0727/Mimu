const placeholders = require('./placeholders');

const placeholderParser = (message, context) => {
    return message.replace(/\{([\w:]+):?([^\}]+)?\}/g, (match, key, args) => {
        const [category, subKey] = key.split('_');
        const placeholder = placeholders[category]?.[subKey];
        if (typeof placeholder === 'function') {
            const parsedArgs = args ? args.split(',') : [];
            return placeholder(context, ...parsedArgs);
        }
        return match; // Unknown placeholder, return as-is
    });
};

module.exports = { placeholderParser };
