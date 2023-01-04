import { gql } from "@apollo/client";
import client from "../../../../apollo-client";

export const useShippingMethods = async (language: string = 'ru') => {

    const { data } = await client.query({
        query: gql`
            query getAllShippingZonesMethods {

                ru: allMultilangWcShippingMethods(zoneId: 1) {
                    method_id
                    method_title
                    method_description
                }

                uk: allMultilangWcShippingMethods(zoneId: 1, language: uk) {
                    method_id
                    method_title
                    method_description
                }

                en: allMultilangWcShippingMethods(zoneId: 1, language: en) {
                    method_id
                    method_title
                    method_description
                }
            }
        `
    });

    return data[language];
}