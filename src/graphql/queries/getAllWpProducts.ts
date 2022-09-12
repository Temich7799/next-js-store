import { gql } from "@apollo/client";

export const GET_ALL_WP_PRODUCTS = gql`
    query getAllWpProducts($filter: ProductsFilter) {
        allWpWcProducts(filter: $filter) {
            id
            name
            price
            sku
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