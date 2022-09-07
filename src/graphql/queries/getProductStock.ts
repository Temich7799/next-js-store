import { gql } from "@apollo/client";

export const GET_PRODUCT_STOCK= gql`
    query getProductStock($wpWcProductId: Int!) {
        wpWcProduct(id: $wpWcProductId) {
            stock_status
            stock_quantity
            manage_stock
        }
    }
`;

