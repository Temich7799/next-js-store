import { gql } from "@apollo/client";

export const GET_NOVA_POSHTA_CITIES = gql`
    query getNovaPoshtaCities($params: NP_CitiesParams) {
        allWpNovaPoshtaCities(params: $params) {
            ref
            description
            description_ru
        }
    }
`;