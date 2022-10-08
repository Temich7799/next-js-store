const NP_WarehousesParams = `#graphql

    input NP_WarehousesParams {
        language: LanguagesEnum
        cityRef: String!
        regExp: String
        limit: Int
    }
`;

module.exports = NP_WarehousesParams;