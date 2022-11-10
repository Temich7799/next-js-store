import { gql } from "@apollo/client";

export const GET_NOVA_POSHTA_CITIES = gql`
    query getAllNovaPoshtaCities($params: NP_CityParams) {
        allNovaPoshtaCities(params: $params) {
            Present
            Ref
        }
    }
`;