const formatPathFromHref = (category, href, language = '') => {

    const arr = href.split('/');

    return `${language === 'ru' ? '' : `${language}/`}${category}/${arr[arr.length - 2]}`;
};

module.exports = formatPathFromHref;