const WC_PaymentMethodParams = `#graphql
    input WC_PaymentMethodParams {
        per_page: Int
        enabled: Boolean
        method_supports: [String]
    }
`;

module.exports = WC_PaymentMethodParams;