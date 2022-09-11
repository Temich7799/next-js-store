import { gql } from "@apollo/client";

export const GET_ALL_WP_PRODUCTS = gql`
    query getAllWpProducts {
        allWpWcProducts {
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