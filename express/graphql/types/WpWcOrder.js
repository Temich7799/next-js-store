const WpWcOrder = `#graphql
    type WpWcOrder {
        id: ID
        status: String
        discount_total: String
        total: String
        payment_method: String
        payment_method_title: String
        transaction_id: String
        date_paid: String
        shipping: WpWcCustomer
        line_items: [WpWcOrderedProduct]
        shipping_lines: [ShippingLine]
    }

    type WpWcOrderedProduct {
        name: String
        product_id: ID
        quantity: Int
        sku: String
        price: Int
    }

    type ShippingLine {
        id: ID
        method_title: String
        method_id: String
    }

    type WpWcCustomer {
        first_name: String
        last_name: String
        address_1: String
        city: String
        phone: String
    }
`;

module.exports = WpWcOrder;