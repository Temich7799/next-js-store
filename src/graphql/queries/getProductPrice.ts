import { gql } from "@apollo/client";

export const GET_PRODUCT_PRICE = gql`
    query WpWcProduct($wpWcProductId: Int!) {
        wpWcProduct(id: $wpWcProductId) {
            purchasable
            price
            sale_price
        }
    }
`;