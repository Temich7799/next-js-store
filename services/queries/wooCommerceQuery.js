const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

async function wooCommerceQuery(endpoint, params = {}, method = 'get', language = '', callback) {

    if (!params.per_page) params.per_page = 100;
    if (!params.offset) params.offset = 0;

    const query = new WooCommerceRestApi({
        url: `${process.env.GATSBY_WP_URL}/${language}`,
        consumerKey: process.env.GATSBY_WC_KEY,
        consumerSecret: process.env.GATSBY_WC_SECRET,
        version: process.env.GATSBY_WC_VERSION
    });

    const data = params.per_page <= 100 ? query[method](endpoint, params).then(response => response.data) : await makeBatchQuery();

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

                return offset >= limit || response.data.length === 0 ? mergeArray : makeBatchQuery(limit - response.data.length, offset, mergeArray);
            }
            else return mergeArray.length > 0 ? mergeArray : response.data;
        });
    }
}

module.exports = wooCommerceQuery;