export type FetchProductsQueryParams = {
    per_page?: number
    after?: string
    before?: string
    offset?: number
    order?: string
    orderby?: string
    slug?: string
    status?: string
    sku?: string
    featured?: boolean
    category?: string
    on_sale?: boolean
    min_price?: string
    max_price?: string
    stock_status?: string
}