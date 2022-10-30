const wooCommerceQuery = require('../../../services/queries/wooCommerceQuery');

const allMultilangWcShippingMethods = {
    type: ['WC_ShippingMethod!'],
    args: {
        zoneId: 'Int!',
        language: 'LanguagesEnum',
        params: 'WC_ShippingMethodParams'
    },
    resolve: (_, { zoneId, language, params }) => wooCommerceQuery(`shipping/zones${zoneId !== undefined ? `/${zoneId}/` : '/'}methods`, { per_page: 10, ...params }, 'get', language)
}

module.exports = allMultilangWcShippingMethods;