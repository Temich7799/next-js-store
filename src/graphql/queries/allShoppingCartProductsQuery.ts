import { gql } from '@apollo/client';

export const ALL_SHOPPING_CART_PRODUCTS = gql`
    query {
        allShopingCartProducts
    }
`;