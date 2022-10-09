const fetch = require('cross-fetch');
const filterData = require('../filterData');
const digObjectByPath = require('../digObjectByPath');

const wordpressQuery = (endpoint, filterArgs, dataPathArray, version = 'wp/v2/') => {

    const { language, filter } = filterArgs;

    return fetch(`${process.env.GATSBY_WP_URL}/${language ? `${language}/` : ''}wp-json/${version === 'none' ? '' : version}${endpoint}`)
        .then(response => response.json())
        .then(response => {

            const data = dataPathArray ? digObjectByPath(dataPathArray, response) : response;

            data.length
                ? data.forEach(key => {
                    key.language = language ? language : 'ru';
                })
                : data.language = language ? language : 'ru';

            return filter !== undefined ? filterData(data, filter) : data
        });
}

module.exports = wordpressQuery;