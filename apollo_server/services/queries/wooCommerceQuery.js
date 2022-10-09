const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const wooCommerceQuery = (endpoint, params, method = 'get', languagePrefix = '', callback) => {

    const query = new WooCommerceRestApi({
        url: `${process.env.WP_URL}/${languagePrefix}`,
        consumerKey: process.env.WC_KEY,
        consumerSecret: process.env.WC_SECRET,
        version: process.env.WC_VERSION
    });

    return query[method](endpoint, params).then((response) => {

        Array.isArray(response.data)
            ? response.data.forEach(key => {
                key.language = languagePrefix ? languagePrefix : 'ru';
            })
            : response.data.language = languagePrefix ? languagePrefix : 'ru';

        return callback
            ? callback(response.data)
            : response.data
    });
}

module.exports = wooCommerceQuery;