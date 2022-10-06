const wooCommerceQuery = require('../../../services/queries/wooCommerceQuery');

const allMultilangWcCategories = {
    type: ['WC_Category!'],
    args: {
        filter: 'WC_ProductCategoryInput',
        language: 'LanguagesEnum',
    },
    resolve: (_, { filter, language }) => {

        const options = {};
        if (filter !== undefined) {
            filter.hide_empty && (options.hide_empty = filter.hide_empty);
            filter.product && (options.product = filter.product);
            filter.slug && (options.slug = filter.slug);
        }

        return wooCommerceQuery(language).get('products/categories', options)
            .then((response) => response.data)
    }
}

module.exports = allMultilangWcCategories;