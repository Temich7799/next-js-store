import { gql } from "@apollo/client";

export const FETCH_WC_PRODUCTS = gql`
    query fetchWcProducts($params: WC_ProductParams) {
        allWcProducts(params: $params) {
            name
            id
            price
            sku
            stock_quantity
            sale_price
            images {
                alt
                src
            }
            categories {
                slug
            }
            yoast_head_json {
                og_url
            }
        }
    }
`;