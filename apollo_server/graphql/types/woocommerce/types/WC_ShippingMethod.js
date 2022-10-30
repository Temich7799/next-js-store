const WC_ShippingMethod = `#graphql
    type WC_ShippingMethod {
        instance_id: Int
        title: String
        method_id: String
        method_title: String
        method_description: String
        enabled: Boolean
    }
`;

module.exports = WC_ShippingMethod;