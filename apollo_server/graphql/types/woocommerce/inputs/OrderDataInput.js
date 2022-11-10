const OrderDataInput = `#graphql
    input OrderDataInput {
        payment_method: String
        shipping: ShippingData!
        billing: ShippingData
        line_items: [LineItemInput!]
        shipping_lines: [ShippingLineInput]
    }

    input ShippingData {
        first_name: String!
        last_name: String
        address_1: String
        city: String
        phone: String!
    }

    input LineItemInput {
        product_id: Int!
        quantity: Int
    }

    input ShippingLineInput {
        method_id: String!
        method_title: String
    }
`;

module.exports = OrderDataInput;