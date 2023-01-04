import { graphql, useStaticQuery } from "gatsby";

export const useShippingMethods = (language: string = 'ru') => {

    const allMultilangWcShippingMethods = useStaticQuery(graphql`

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
        `);

    return allMultilangWcShippingMethods[language];
}