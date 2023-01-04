import { gql } from "@apollo/client";
import client from "../../../../apollo-client";
import { MenuItemType } from "../../../types/MenuItemType";

export const useFooterMenuItems = async (language: string = 'ru'): [MenuItemType] => {

    const { data } = await client.query({
        query: gql`
            query getAllMultilangFooterMenuItems { 

                ru: allMultilangWpMenuItems(slug: "footer", language: ru) { 
                    slug
                    title 
                    child_items { 
                        slug 
                        title 
                    } 
                }

                uk: allMultilangWpMenuItems(slug: "footer", language: uk) { 
                    slug
                    title 
                    child_items { 
                        slug 
                        title 
                    } 
                } 

                en: allMultilangWpMenuItems(slug: "footer", language: en) { 
                    slug
                    title 
                    child_items { 
                        slug 
                        title 
                    } 
                } 
            }
        `,
    });

    return data[language]
}