require('dotenv').config();

const wooCommerceQuery = require("../services/queries/wooCommerceQuery");
const wordpressQuery = require("../services/queries/wordpressQuery");
const sqlQuery = require("../services/queries/sqlQuery");

const resolvers = {
    Query: {
        allWpPages: (_, { language, filter }) => wordpressQuery('pages', { language: language, filter: filter }),
        allWpPosts: (_, { language, filter }) => wordpressQuery('posts', { language: language, filter: filter }),
        allWpMenuItems: (_, { language, slug, filter }) => wordpressQuery(`menus/v1/menus/${slug}`, { language: language, filter: filter }, ['items'], 'none'),
        allWpWcOrders: () => wooCommerceQuery('orders'),
        allWpNovaPoshtaCities: (_, { params }) => {

            const cityRow = params.language == 'uk' ? 'description' : 'description_ru';
            const sqlLimit = params.limit == undefined ? '' : ` LIMIT ${params.limit}`;

            return sqlQuery(regExp == undefined
                ? 'SELECT `ref`,`' + cityRow + '` FROM `wp_nova_poshta_city` WHERE 1' + sqlLimit
                : 'SELECT `ref`,`' + cityRow + '` FROM `wp_nova_poshta_city` WHERE LOWER(' + cityRow + `) REGEXP '^` + params.regExp.toLowerCase() + `'` + ' ORDER BY CHAR_LENGTH(' + cityRow + ')' + sqlLimit);
        },
        allWpNovaPoshtaWarehouses: (_, { params }) => {

            const warehouseRow = params.language == 'uk' ? 'description' : 'description_ru';
            const sqlLimit = params.limit == undefined ? '' : ` LIMIT ${params.imit}`;
            const regex = params.regExp == undefined ? '' : `) REGEXP '` + params.regExp.toLowerCase();

            return sqlQuery(params.cityRef == undefined
                ? 'SELECT `parent_ref`,`' + warehouseRow + '` FROM `wp_nova_poshta_warehouse` WHERE 1' + sqlLimit
                : 'SELECT `parent_ref`,`' + warehouseRow + '` FROM `wp_nova_poshta_warehouse` WHERE parent_ref = \'' + params.cityRef + '\' AND LOWER(' + warehouseRow + regex + `'` + ' ORDER BY CHAR_LENGTH(' + warehouseRow + ')' + sqlLimit);
        },
        allWcProducts: (_, { params }) => {

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

            return wooCommerceQuery('products', options);
        },
        allWcProductsCategories: (_, { params }) => {

            const options = {};

            if (params !== undefined) {
                params.hide_empty && (options.hide_empty = params.hide_empty);
                params.product && (options.product = params.product);
                params.slug && (options.slug = params.slug);
            }

            return wooCommerceQuery('products/categories', options);
        },
        allWcShippingZonesMethods: (_, { zoneId }) => {
            return wooCommerceQuery(`shipping/zones${zoneId !== undefined ? `/${zoneId}/` : '/'}methods`);
        },
        allWcPaymentMethods: () =>

            wooCommerceQuery('payment_gateways', null, 'get', '', (data) => {
                const result = [];

                data.forEach((paymentMethod) => {
                    if (paymentMethod.settings.enable_for_methods) {
                        paymentMethod.enable_for_methods = [];

                        Object.entries(paymentMethod.settings.enable_for_methods.options).forEach(enableMethods => {

                            Object.entries(enableMethods[1]).forEach(method => {
                                method.forEach(name => { paymentMethod.enable_for_methods.push(name) })
                            })
                        }
                        );
                        result.push(paymentMethod);
                    }

                    else {
                        result.push(paymentMethod);
                    }
                })

                return result;
            }),

        wpWcOrder: (_, { productId }) => wooCommerceQuery(`orders/${productId}`),
        wpWcProduct: (_, { productId }) => wooCommerceQuery(`products/${productId}`),

    },
    Mutation: {
        wpWcCreateOrder: (_, { data }) => wooCommerceQuery("orders", data, 'post'),
    }
};

module.exports = resolvers;