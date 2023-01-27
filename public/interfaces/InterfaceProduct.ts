export interface ProductBase {
    id: string
    name: string
    sku: string
    images: Array<null> | [
        {
            src: string
            alt: string
        }
    ]
    categories: Array<null> | [
        {
            slug: string
        }
    ]
}

export interface ProductFetched extends ProductBase {
    price: string
    sale_price: string
    stock_quantity: number | null
    yoast_head_json: {
        og_url: string
    }
}

export interface ProductInCart extends ProductFetched {
    quantity?: number
}

export interface wpProduct extends ProductBase {
    description: string
    related_ids: Array<null> | [string]
    attributes: Array<null> | [
        {
            options: [string]
            name: string
        }
    ]
}

export interface Product extends ProductFetched, wpProduct {
    stock_status?: string;
}