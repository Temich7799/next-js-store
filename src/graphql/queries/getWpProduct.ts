export const GET_WP_PRODUCT = `
    query getWpProduct($productId: Int!) {
        wpWcProduct(productId: $productId) {
            name
            sku
            price
            sale_price
            stock_quantity
            stock_status    
            description
            related_ids
            id
            attributes {
                options
                name
            }
            images {
                alt
                src
            }
            categories {
                slug
            }
        }
    }
`;