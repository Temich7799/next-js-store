const fetch = require('cross-fetch');
const filterData = require('../filterData');
const digObjectByPath = require('../digObjectByPath');

const wordpressQuery = (endpoint, options, dataPathArray, version = 'wp/v2/') => {

    const { language, filter } = options;

    return fetch(`${process.env.WP_URL}/${language ? `${language}/` : ''}wp-json/${version === 'none' ? '' : version}${endpoint}`)
        .then(response => response.json())
        .then(response => {

            const data = dataPathArray ? digObjectByPath(dataPathArray, response) : response;

            data.forEach(key => {
                key.language = language ? language : 'ru';
            })

            return filter !== undefined ? filterData(data, filter) : data
        });
}

module.exports = wordpressQuery;