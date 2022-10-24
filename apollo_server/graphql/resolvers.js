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
        allWcProducts: (_, { params }) => wooCommerceQuery('products', params),
        allWcProductsCategories: (_, { params }) => wooCommerceQuery('products/categories', params),
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

        wpPage: (_, { language, pageId }) => wordpressQuery(`pages/${pageId}`, { language: language }),
        wpPost: (_, { language, postId }) => wordpressQuery(`posts/${postId}`, { language: language }),
        wpWcOrder: (_, { productId }) => wooCommerceQuery(`orders/${productId}`),
        wpWcProduct: (_, { productId, language }) => wooCommerceQuery(`products/${productId}`, undefined, 'get', language),

    },
    Mutation: {
        wpWcCreateOrder: (_, { data }) => wooCommerceQuery("orders", data, 'post'),
    }
};

module.exports = resolvers;