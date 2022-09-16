import { gql } from "@apollo/client";

export const CREATE_WP_ORDER = gql`
    mutation($data: OrderDataInput!) {
        wpWcCreateOrder(data: $data) {
            id
        }
}   
`;