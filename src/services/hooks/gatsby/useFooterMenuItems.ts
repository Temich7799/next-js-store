import { graphql, useStaticQuery } from "gatsby"
import { MenuItemType } from "../../../types/MenuItemType";

export const useFooterMenuItems = (language: string = 'ru'): [MenuItemType] => {

    const allMultilangWpMenuItems = useStaticQuery(graphql`

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
    `);

    return allMultilangWpMenuItems[language]
}