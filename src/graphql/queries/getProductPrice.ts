import { gql } from "@apollo/client";

export const GET_PRODUCT_PRICE = gql`
    query getProductPrice($wpWcProductId: Int!) {
        wpWcProduct(id: $wpWcProductId) {
            price
            sale_price
        }
    }
`;