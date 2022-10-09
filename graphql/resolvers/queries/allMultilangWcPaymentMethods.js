const wooCommerceQuery = require('../../../services/queries/wooCommerceQuery');

const allMultilangWcPaymentMethods = {
    type: ['WC_PaymentMethod!'],
    resolve: () => wooCommerceQuery('payment_gateways', null, 'get', '', (data) => {

        const result = [];

        data.forEach((WC_PaymentMethod) => {
            if (WC_PaymentMethod.settings.enable_for_methods) {
                WC_PaymentMethod.enable_for_methods = [];

                Object.entries(WC_PaymentMethod.settings.enable_for_methods.options).forEach(enableMethods => {

                    Object.entries(enableMethods[1]).forEach(method => {
                        method.forEach(name => { WC_PaymentMethod.enable_for_methods.push(name) })
                    })
                }
                );
                result.push(WC_PaymentMethod);
            }

            else {
                result.push(WC_PaymentMethod);
            }
        })

        return result;
    }),
}

module.exports = allMultilangWcPaymentMethods;