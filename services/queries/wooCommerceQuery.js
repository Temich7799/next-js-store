const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const wooCommerceQuery = (endpoint, params, method = 'get', languagePrefix = '', callback) => {

    const query = new WooCommerceRestApi({
        url: `${process.env.GATSBY_WP_URL}/${languagePrefix}`,
        consumerKey: process.env.GATSBY_WC_KEY,
        consumerSecret: process.env.GATSBY_WC_SECRET,
        version: process.env.GATSBY_WC_VERSION
    });

    return query[method](endpoint, params).then((response) => {
        return callback
            ? callback(response.data)
            : response.data
    });
}

module.exports = wooCommerceQuery;