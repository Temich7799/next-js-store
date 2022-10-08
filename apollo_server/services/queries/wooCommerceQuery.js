const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const wooCommerceQuery = (languagePrefix) => {

    return new WooCommerceRestApi({
        url: `${process.env.WP_URL}${languagePrefix ? `/${languagePrefix}` : ''}`,
        consumerKey: process.env.GATSBY_WC_KEY,
        consumerSecret: process.env.GATSBY_WC_SECRET,
        version: process.env.GATSBY_WC_VERSION
    });
}

module.exports = wooCommerceQuery;