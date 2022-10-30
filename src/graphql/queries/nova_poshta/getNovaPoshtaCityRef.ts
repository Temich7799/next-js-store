import { gql } from "@apollo/client";

export const GET_NOVA_POSHTA_CITY_REF = gql`
    query getNovaPoshtaCityRef($params: NP_CitiesParams) {
        allWpNovaPoshtaCities(params: $params) {
            ref
        }
    }
`;