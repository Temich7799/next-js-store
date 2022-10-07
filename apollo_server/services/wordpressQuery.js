const fetch = require('cross-fetch');
const filterData = require('./filterData');

const wordpressQuery = (endpoint, options, version) => {

    const { language, filter } = options;

    return fetch(`${process.env.WP_URL}/${language ? `${language}/` : ''}wp-json/${version === 'none' ? '' : version ? `${version}/` : 'wp/v2/'}${endpoint}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(key => { key.language = language ? language : 'ru'; })
            return filter !== undefined ? filterData(data, filter) : data
        });
}

module.exports = wordpressQuery;