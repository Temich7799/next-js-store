import { gql } from "@apollo/client";

export const GET_NOVA_POSHTA_WAREHOUSES = gql`
    query getNovaPoshtaWarehouses($cityRef: String!, $language: Languages, $regExp: String, $limit: Int) {
        allWpNovaPoshtaWarehouses(cityRef: $cityRef, language: $language, regExp: $regExp, limit: $limit) {
            description_ru
        }
    }
`;