const wooCommerceQuery = require('../../../services/queries/wooCommerceQuery');

const allMultilangWcProducts = {
    type: ['WC_Product!'],
    args: {
        params: 'WC_ProductParams',
        language: 'LanguagesEnum',
    },
    resolve: (_, { params, language }) => {

        const options = {};
        if (params !== undefined) {
            params.offset && (options.offset = params.offset);
            params.per_page ? options.per_page = params.per_page < 100 ? params.per_page : 100 : options.per_page = 50;
            params.status && (options.status = params.status);
            params.orderby && (options.orderby = params.orderby);
            params.stock_status && (options.stock_status = params.stock_status);
            params.category && (options.category = params.category);
            params.include && (options.include = params.include);
        }

        return wooCommerceQuery(language).get('products', options)
            .then((response) => response.data)
    }
}

module.exports = allMultilangWcProducts;