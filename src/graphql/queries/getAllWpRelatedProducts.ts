import { gql } from "@apollo/client";

export const GET_ALL_WP_RELATED_PRODUCTS = gql`
    query getAllWpRelatedProducts($params: WC_ProductParams) {
        allWcProducts(params: $params) {
            name
            price
            sku
            sale_price
            stock_quantity
            stock_status
            id
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