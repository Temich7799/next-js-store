const WC_ProductParams = `#graphql
    input WC_ProductParams {
        orderby: String
        after: String
        before: String
        offset: Int
        per_page: Int
        on_sale: Boolean
        include: [String]
        stock_status: StockStatusesEnum
        status: PublishStatusesEnum
        category: String
    }
`;

module.exports = WC_ProductParams;