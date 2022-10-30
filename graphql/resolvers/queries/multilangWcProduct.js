const wooCommerceQuery = require('../../../services/queries/wooCommerceQuery');

const multilangWcProduct = {
    type: 'WC_Product!',
    args: {
        productId: 'Int!',
        language: 'LanguagesEnum',
    },
    resolve: (_, { productId, language }) => wooCommerceQuery(`products/${productId}`, undefined, 'get', language)
}

module.exports = multilangWcProduct;