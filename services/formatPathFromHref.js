const formatPathFromHref = (href, language = '') => {
    return `${language === 'ru' ? '' : `${language}/`}${href.split('https://malinikids.com/')[1]
        }`;
};

module.exports = formatPathFromHref;