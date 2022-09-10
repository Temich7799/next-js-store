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
`;

module.exports = WpWcOrder;