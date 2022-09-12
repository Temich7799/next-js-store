import { gql } from "@apollo/client";

export const GET_ALL_WP_RELATED_PRODUCTS_IDS = gql`
    query getAllWpRelatedProductsIds($productId: Int!) {
        wpWcProduct(productId: $productId) {
            related_ids
        }
    }
`;