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

            return sqlQuery(params.regExp == undefined
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
        allWcShippingZonesMethods: (_, { zoneId, language, params }) => wooCommerceQuery(`shipping/zones${zoneId !== undefined ? `/${zoneId}/` : '/'}methods`, { per_page: 10, ...params }, 'get', language),
        allWcPaymentMethods: (_, { language, params }) => wooCommerceQuery('payment_gateways', { per_page: 10, ...params }, 'get', language),
        allWpMetaData: (_, { endpoint, language }) => wordpressQuery(endpoint, { language: language }).then((res) => res.map((page) => page.yoast_head_json)),

        wpPage: (_, { language, pageId }) => wordpressQuery(`pages/${pageId}`, { language: language }),
        wpPost: (_, { language, postId }) => wordpressQuery(`posts/${postId}`, { language: language }),
        wpWcOrder: (_, { productId }) => wooCommerceQuery(`orders/${productId}`),
        wpWcProduct: (_, { productId, language }) => wooCommerceQuery(`products/${productId}`, undefined, 'get', language),
        wpMetaData: (_, { endpoint, language, pageId }) => wordpressQuery(`${endpoint}?id=${pageId}`, { language: language }).then((res) => res[0].yoast_head_json),

    },
    Mutation: {
        wpWcCreateOrder: (_, { data }) => wooCommerceQuery("orders", data, 'post'),
    }
};

module.exports = resolvers;