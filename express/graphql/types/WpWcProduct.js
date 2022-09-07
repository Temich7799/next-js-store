const WpWcProduct = `
    type WpWcProductCategory {
        id: ID
        name: String
        slug: String
    }

    type WpWcProductImage {
        id: ID
        src: String
        alt: String
    }

    type WpWcProduct {
        id: ID
        name: String
        slug: String
        sku: String
        price: String
        sale_price: String
        stock_status: String
        stock_quantity: Int
        manage_stock: Boolean
        related_ids: [ID]
        categories: [WpWcProductCategory]
        images: [WpWcProductImage]
    }
`;

module.exports = WpWcProduct;