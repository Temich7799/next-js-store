import { gql } from "@apollo/client";

export const GET_NOVA_POSHTA_WAREHOUSES = gql`
    query getNovaPoshtaWarehouses($cityRef: String!, $language: Languages, $regExp: String) {
        allWpNovaPoshtaWarehouses(cityRef: $cityRef, language: $language, regExp: $regExp) {
            description_ru
        }
    }
`;