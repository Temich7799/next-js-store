const wooCommerceQuery = require('../../../services/queries/wooCommerceQuery');

const allMultilangWcCategories = {
    type: ['WC_Category!'],
    args: {
        params: 'WC_ProductCategoryParams',
        language: 'LanguagesEnum',
    },
    resolve: (_, { params, language }) => wooCommerceQuery('products/categories', params, 'get', language)
}

module.exports = allMultilangWcCategories;