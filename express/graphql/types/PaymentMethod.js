const PaymentMethod = `#graphql
    type PaymentMethod {
        id: String
        title: String
        description: String
        order: Int
        enabled: Boolean
        method_title: String
        method_description: String
        needs_setup: Boolean
        settings_url: String
        enable_for_methods: [String]
    }
`;



module.exports = PaymentMethod;