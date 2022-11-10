const NP_WarehouseParams = `#graphql

    input NP_WarehouseParams {
        CityName: String
        SettlementRef: String
        Page: String
        Limit: String
        Language: String
        TypeOfWarehouseRef: String
        FindByString: String
        WarehouseId: Int
    }
`;

module.exports = NP_WarehouseParams;