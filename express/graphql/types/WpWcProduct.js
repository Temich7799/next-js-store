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
        purchasable: Boolean
        related_ids: [ID]
        categories: [WpWcProductCategory]
        images: [WpWcProductImage]
    }
`;

module.exports = WpWcProduct;