import { gql } from "@apollo/client";

export const GET_NOVA_POSHTA_CITIES = gql`
    query getNovaPoshtaCities($regExp: String!, $language: Languages) {
        allWpNovaPoshtaCities(regExp: $regExp, language: $language) {
            ref
            description
            description_ru
        }
    }
`;