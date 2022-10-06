const wooCommerceQuery = require('../../../services/queries/wooCommerceQuery');

const allMultilangWcShippingMethods = {
    type: ['WC_ShippingMethod!'],
    args: {
        zoneId: 'Int!',
        language: 'LanguagesEnum',
    },
    resolve: (_, { zoneId, language }) => wooCommerceQuery(language).get(`shipping/zones${zoneId !== undefined ? `/${zoneId}/` : '/'}methods`).then((response) => response.data)
}

module.exports = allMultilangWcShippingMethods;