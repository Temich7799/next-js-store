const WC_Product = `#graphql

    type WC_Product {
        id: ID
        name: String
        slug: String
        sku: String
        description: String
        price: String
        sale_price: String
        status: String
        stock_status: String
        stock_quantity: Int
        attributes: [wpWcProductAttributes]
        manage_stock: Boolean
        related_ids: [ID]
        categories: [WC_ProductCategory]
        images: [WC_ProductImage]
    }

    type wpWcProductAttributes {
        options: [String]
        name: String
    }

    type WC_ProductCategory {
        id: ID
        name: String
        slug: String
    }

    type WC_ProductImage {
        id: ID
        src: String
        alt: String
    }
`;

module.exports = WC_Product;