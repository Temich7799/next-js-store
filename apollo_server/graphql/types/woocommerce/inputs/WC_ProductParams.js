const WC_ProductParams = `#graphql
    input WC_ProductParams {
        orderby: String
        offset: Int
        per_page: Int
        include: [Int]
        stock_status: StockStatusesEnum
        status: PublishStatusesEnum
        category: String
    }
`;

module.exports = WC_ProductParams;