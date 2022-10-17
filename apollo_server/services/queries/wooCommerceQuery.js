const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

async function wooCommerceQuery(endpoint, params = {}, method = 'get', languagePrefix = '', callback) {

    if (!params.per_page) params.per_page = 10000;
    if (!params.offset) params.offset = 0;

    const query = new WooCommerceRestApi({
        url: `${process.env.WP_URL}/${languagePrefix}`,
        consumerKey: process.env.WC_KEY,
        consumerSecret: process.env.WC_SECRET,
        version: process.env.WC_VERSION
    });

    const data = await makeBatchQuery();

    Array.isArray(data)
        ? data.forEach(key => {
            key.language = languagePrefix ? languagePrefix : 'ru';
        })
        : data.language = languagePrefix ? languagePrefix : 'ru';

    return callback
        ? callback(data)
        : data

    async function makeBatchQuery(limit = params.per_page, offset = params.offset, mergeArray = []) {

        params.offset = offset;
        params.per_page = limit > 100 ? 100 : limit;

        return query[method](endpoint, params).then(response => {

            if (response.data && response.data.length > 0) {

                mergeArray = [...mergeArray, ...response.data];

                offset += response.data.length;

                return offset >= limit ? mergeArray : makeBatchQuery(limit - offset, offset, mergeArray);
            }
            else return mergeArray.length > 0 ? mergeArray : response.data;
        });
    }
}

module.exports = wooCommerceQuery;