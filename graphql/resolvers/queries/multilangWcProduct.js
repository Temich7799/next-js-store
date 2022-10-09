const wooCommerceQuery = require('../../../services/queries/wooCommerceQuery');

const multilangWcProduct = {
    type: 'WC_Product!',
    args: {
        productId: 'Int!',
        language: 'LanguagesEnum',
    },
    resolve: (_, { productId, language }) => wooCommerceQuery(language).get(`products/${productId}`)
        .then((response) => response.data)
}

module.exports = multilangWcProduct;