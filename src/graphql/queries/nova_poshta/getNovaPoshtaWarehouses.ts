import { gql } from "@apollo/client";

export const GET_NOVA_POSHTA_WAREHOUSES = gql`
    query getNovaPoshtaWarehouses($params: NP_WarehousesParams) {
        allWpNovaPoshtaWarehouses(params: $params) {
            description_ru
        }
    }
`;