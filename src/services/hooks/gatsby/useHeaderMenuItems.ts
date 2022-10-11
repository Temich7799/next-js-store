import { graphql, useStaticQuery } from "gatsby"
import { MenuItemType } from "../../../types/MenuItemType";

export const useHeaderMenuItems = (language: string): [MenuItemType] => {

    const allMultilangWpMenuItems = useStaticQuery(graphql`

        query getAllMultilangHeaderMenuItems { 

            ru: allMultilangWpMenuItems(slug: "header", language: ru) { 
                slug
                title 
                child_items { 
                    slug 
                    title 
                } 
            }

            uk: allMultilangWpMenuItems(slug: "header", language: uk) { 
                slug
                title 
                child_items { 
                    slug 
                    title 
                } 
            } 

            en: allMultilangWpMenuItems(slug: "header", language: en) { 
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