const WC_ProductParams = `#graphql
    input WC_ProductParams {
        orderby: String
        after: String
        before: String
        offset: Int
        per_page: Int
        on_sale: Boolean
        include: WC_ProductFilterInclude
        stock_status: StockStatusesEnum
        status: PublishStatusesEnum
        category: String
        slug: String
    }

    input WC_ProductFilterInclude {
        slug: [String]
        id: [Int]
    }
`;

module.exports = WC_ProductParams;