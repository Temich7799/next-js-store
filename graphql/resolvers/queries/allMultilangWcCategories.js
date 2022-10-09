const wooCommerceQuery = require('../../../services/queries/wooCommerceQuery');

const allMultilangWcCategories = {
    type: ['WC_Category!'],
    args: {
        params: 'WC_ProductCategoryParams',
        language: 'LanguagesEnum',
    },
    resolve: (_, { params, language }) => {

        const options = {};
        if (params !== undefined) {
            params.hide_empty && (options.hide_empty = params.hide_empty);
            params.product && (options.product = params.product);
            params.slug && (options.slug = params.slug);
        }

        return wooCommerceQuery('products/categories', options, 'get', language)
    }
}

module.exports = allMultilangWcCategories;