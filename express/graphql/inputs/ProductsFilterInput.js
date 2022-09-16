const ProductsFilterInput = `#graphql
    input ProductsFilterInput {
        orderby: String
        offset: Int
        per_page: Int
        include: [Int]
        stock_status: StockStatusesEnum
        status: PublishStatusesEnum
        category: String
    }
`;

module.exports = ProductsFilterInput;