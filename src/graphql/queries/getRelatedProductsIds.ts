import { gql } from "@apollo/client";

export const GET_RELATED_PRODUCTS_IDS = gql`
    query getRelatedProductsIds($productId: Int!) {
        wpWcProduct(productId: $productId) {
            related_ids
        }
    }
`;