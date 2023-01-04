import { gql } from "@apollo/client";

export const GET_NOVA_POSHTA_WAREHOUSES = gql`
    query getAllNovaPoshtaWarehouses($params: NP_WarehouseParams) {
        allNovaPoshtaWarehouses(params: $params) {
            Description
        }
    }
`;