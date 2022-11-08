const fetch = require('cross-fetch');
const filterData = require('../filterData');
const digObjectByPath = require('../digObjectByPath');

const wordpressQuery = (endpoint, filterArgs, dataPathArray, version = 'wp/v2/') => {

    const { language, filter } = filterArgs;

    return fetch(`${process.env.GATSBY_WP_URL}/${language ? `${language}/` : ''}wp-json/${version === 'none' ? '' : version}${endpoint}`)
        .then(response => response.text())
        .then(response => {
            const json = JSON.parse(response.replace(/@/g, ''));
            const data = dataPathArray ? digObjectByPath(dataPathArray, json) : json;

            return filter !== undefined ? filterData(data, filter) : data
        });
}

module.exports = wordpressQuery;