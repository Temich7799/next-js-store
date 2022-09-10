const WpWcOrderedProduct = `#graphql
    type WpWcOrderedProduct {
        name: String
        product_id: ID
        quantity: Int
        sku: String
        price: Int
    }   
`;

module.exports = WpWcOrderedProduct;