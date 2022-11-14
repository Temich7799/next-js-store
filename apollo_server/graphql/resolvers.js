require('dotenv').config();

const wooCommerceQuery = require("../services/queries/wooCommerceQuery");
const wordpressQuery = require("../services/queries/wordpressQuery");
const novaPoshtaQuery = require('../services/queries/novaPoshtaQuery');

const resolvers = {
    Query: {
        allWpPages: (_, { language, filter, params }) => wordpressQuery('pages', { language: language, filter: filter, params: params }),
        allWpPosts: (_, { language, filter, params }) => wordpressQuery('posts', { language: language, filter: filter, params: params }),
        allWpMenuItems: (_, { language, slug, filter, params }) => wordpressQuery(`menus/v1/menus/${slug}`, { language: language, filter: filter, params: params }, ['items'], 'none'),
        allWpWcOrders: () => wooCommerceQuery('orders'),
        allNovaPoshtaCities: (_, { params }) => novaPoshtaQuery('searchSettlements', {
            CityName: params.CityName,
            Limit: params.Limit ? params.Limit : 10,
            Page: params.Page ? params.Page : 1,
        }),
        allNovaPoshtaStreets: (_, { params }) => novaPoshtaQuery('searchSettlementStreets', {
            StreetName: params.StreetName,
            SettlementRef: params.SettlementRef,
            Limit: params.Limit ? params.Limit : 15
        }),
        allNovaPoshtaWarehouses: (_, { params }) => novaPoshtaQuery('getWarehouses', {
            CityName: params.CityName && params.CityName,
            SettlementRef: params.SettlementRef,
            Page: params.Page ? params.Page : 1,
            Limit: params.Limit ? params.Limit : 15,
            FindByString: params.FindByString && params.FindByString,

        }),
        allWcProducts: (_, { language, params }) => wooCommerceQuery('products', params, 'get', language),
        allWcProductsCategories: (_, { params }) => wooCommerceQuery('products/categories', params),
        allWcShippingZonesMethods: (_, { zoneId, language, params }) => wooCommerceQuery(`shipping/zones${zoneId !== undefined ? `/${zoneId}/` : '/'}methods`, { per_page: 10, ...params }, 'get', language),
        allWcPaymentMethods: (_, { language, params }) => wooCommerceQuery('payment_gateways', { per_page: 10, ...params }, 'get', language),
        allWpMetaData: (_, { endpoint, language, params }) => wordpressQuery(endpoint, { language: language, params: params }).then((res) => res.map((page) => page.yoast_head_json)),

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