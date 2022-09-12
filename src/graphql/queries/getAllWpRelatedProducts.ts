import { gql } from "@apollo/client";

export const GET_ALL_WP_RELATED_PRODUCTS = gql`
    query getAllWpRelatedProducts($filter: ProductsFilter) {
        allWpWcProducts(filter: $filter) {
            name
            price
            sku
            sale_price
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