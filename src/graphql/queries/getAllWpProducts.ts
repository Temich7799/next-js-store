import { gql } from "@apollo/client";

export const GET_ALL_WP_PRODUCTS = gql`
    query getAllWpProducts($filter: ProductsFilterInput) {
        allWpWcProducts(filter: $filter) {
            name
            id
            price
            sku
            stock_quantity
            stock_status
            sale_price
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