const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const wooCommerceQuery = (languagePrefix) => {

    return new WooCommerceRestApi({
        url: `${process.env.WP_URL}${languagePrefix ? `/${languagePrefix}` : ''}`,
        consumerKey: process.env.WC_KEY,
        consumerSecret: process.env.WC_SECRET,
        version: process.env.WC_VERSION
    });
}

module.exports = wooCommerceQuery;