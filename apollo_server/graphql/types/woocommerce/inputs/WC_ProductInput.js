const WC_ProductInput = `#graphql
    input WC_ProductInput {
        orderby: String
        offset: Int
        per_page: Int
        include: [Int]
        stock_status: StockStatusesEnum
        status: PublishStatusesEnum
        category: String
    }
`;

module.exports = WC_ProductInput;