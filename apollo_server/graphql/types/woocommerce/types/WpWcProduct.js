const WpWcProduct = `#graphql

    type WpWcProduct {
        id: ID
        name: String
        slug: String
        sku: String
        description: String
        price: String
        sale_price: String
        stock_status: String
        stock_quantity: Int
        attributes: [wpWcProductAttributes]
        manage_stock: Boolean
        related_ids: [ID]
        categories: [WpWcProductCategory]
        images: [WpWcProductImage]
    }

    type wpWcProductAttributes {
        options: [String]
        name: String
    }

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
`;

module.exports = WpWcProduct;