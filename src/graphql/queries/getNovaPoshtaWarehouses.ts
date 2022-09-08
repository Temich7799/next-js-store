import { gql } from "@apollo/client";

export const GET_NOVA_POSHTA_WAREHOUSES = gql`
    query getNovaPoshtaWarehouses($cityRef: String!, $language: Languages) {
        allWpNovaPoshtaWarehouses(cityRef: $cityRef, language: $language) {
            description_ru
        }
    }
`;