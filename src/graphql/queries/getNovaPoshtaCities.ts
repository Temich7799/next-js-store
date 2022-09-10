import { gql } from "@apollo/client";

export const GET_NOVA_POSHTA_CITIES = gql`
    query getNovaPoshtaCities($regExp: String!, $language: Languages, $limit: Int) {
        allWpNovaPoshtaCities(regExp: $regExp, language: $language, limit: $limit) {
            ref
            description
            description_ru
        }
    }
`;