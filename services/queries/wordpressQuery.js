const fetch = require('cross-fetch');
const filterData = require('../filterData');
const digObjectByPath = require('../digObjectByPath');

const wordpressQuery = async (endpoint, options = {}, dataPathArray, version = 'wp/v2/') => {

    const { language, params, filter } = options;

    const per_page = params && params.per_page ? params.per_page : 100;
    const offset = params && params.offset ? params.offset : 0;

    const data = per_page <= 100 ? await fetchPageData() : await makeBatchQuery();

    async function fetchPageData() {
        return await fetch(`${process.env.GATSBY_WP_URL}/${language ? `${language}/` : ''}wp-json/${version === 'none' ? '' : version}${endpoint}?per_page=${per_page}&offset=${offset}`)
            .then(response => response.text())
            .then(response => {
                const json = JSON.parse(response.replace(/@/g, ''));
                return dataPathArray ? digObjectByPath(dataPathArray, json) : json;
            });
    }

    async function makeBatchQuery(limit = per_page, offset = offset, mergeArray = []) {

        offset = offset;
        per_page = limit > 100 ? 100 : limit;

        return fetchPageData().then(response => {

            if (response && response.length > 0) {

                mergeArray = [...mergeArray, ...response];

                offset += response.length;

                return offset >= limit || response.length === 0 ? mergeArray : makeBatchQuery(limit - offset, offset, mergeArray);
            }
            else return mergeArray.length > 0 ? mergeArray : response;
        });
    }
    return filter !== undefined ? filterData(data, filter) : data


}


module.exports = wordpressQuery;