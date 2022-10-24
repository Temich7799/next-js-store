const wooCommerceQuery = require('../../../services/queries/wooCommerceQuery');

const allMultilangWcProducts = {
    type: ['WC_Product!'],
    args: {
        params: 'WC_ProductParams',
        language: 'LanguagesEnum',
    },
    resolve: (_, { params, language }) => wooCommerceQuery('products', params, 'get', language)
}

module.exports = allMultilangWcProducts;