import { gql } from "@apollo/client";

export const GET_NOVA_POSHTA_CITY_REF = gql`
    query getNovaPoshtaCityRef($regExp: String!, $language: Languages) {
        allWpNovaPoshtaCities(regExp: $regExp, language: $language) {
            ref
        }
    }
`;