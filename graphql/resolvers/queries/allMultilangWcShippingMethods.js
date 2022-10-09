const wooCommerceQuery = require('../../../services/queries/wooCommerceQuery');

const allMultilangWcShippingMethods = {
    type: ['WC_ShippingMethod!'],
    args: {
        zoneId: 'Int!',
        language: 'LanguagesEnum',
    },
    resolve: (_, { zoneId, language }) => wooCommerceQuery(`shipping/zones${zoneId !== undefined ? `/${zoneId}/` : '/'}methods`, null, 'get', language)
}

module.exports = allMultilangWcShippingMethods;