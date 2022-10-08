const WC_ProductCategoryParams = `#graphql
    input WC_ProductCategoryParams {
        hide_empty: Boolean
        product: Int
        slug: String
    }
`;

module.exports = WC_ProductCategoryParams;