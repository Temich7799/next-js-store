export interface ProductBase {
    id: string
    name: string
    sku: string
    images: [
        {
            src: string
            alt: string
        }
    ]
    categories: [
        {
            slug: string
        }
    ]
}

export interface ProductFetched extends ProductBase {
    price: string
    sale_price: string
    stock_quantity: number | null
}

export interface ProductInCart extends ProductFetched {
    quantity?: number
}

export interface ProductGatsby extends ProductBase {
    description: string
    related_ids: [string]
    attributes: [
        {
            options: [string]
            name: string
        }
    ]
}

export interface Product extends ProductFetched, ProductGatsby { }