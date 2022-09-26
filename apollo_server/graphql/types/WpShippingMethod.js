const WpShippingMethod = `#graphql
    type WpShippingMethod {
        instance_id: Int
        title: String
        method_id: String
        method_title: String
        method_description: String
        enabled: Boolean
    }
`;

module.exports = WpShippingMethod;