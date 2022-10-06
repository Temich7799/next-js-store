const wooCommerceQuery = require('../../../services/queries/wooCommerceQuery');

const allMultilangWcProducts = {
    type: ['WC_Product!'],
    args: {
        filter: 'WC_ProductInput',
        language: 'LanguagesEnum',
    },
    resolve: (_, { filter, language }) => {

        const options = {};
        if (filter !== undefined) {
            filter.offset && (options.offset = filter.offset);
            filter.per_page ? options.per_page = filter.per_page < 100 ? filter.per_page : 100 : options.per_page = 50;
            filter.status && (options.status = filter.status);
            filter.orderby && (options.orderby = filter.orderby);
            filter.stock_status && (options.stock_status = filter.stock_status);
            filter.category && (options.category = filter.category);
            filter.include && (options.include = filter.include);
        }

        return wooCommerceQuery(language).get('products', options)
            .then((response) => response.data)
    }
}

module.exports = allMultilangWcProducts;