const wooCommerceQuery = require('../../../services/queries/wooCommerceQuery');

const allMultilangWcPaymentMethods = {
    type: ['WC_PaymentMethod!'],
    args: {
        language: 'LanguagesEnum',
        params: 'WC_PaymentMethodParams'
    },
    resolve: (_, { language, params }) => wooCommerceQuery('payment_gateways', { per_page: 10, ...params }, 'get', language),
}

module.exports = allMultilangWcPaymentMethods;