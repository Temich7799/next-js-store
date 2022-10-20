import { graphql, useStaticQuery } from "gatsby"
import { MenuItemType } from "../../../types/MenuItemType";

export const useHeaderMenuItems = (language: string): [MenuItemType] => {

    const allMultilangWpMenuItems = useStaticQuery(graphql`

        query getAllMultilangHeaderMenuItems { 

            ru: allMultilangWpMenuItems(slug: "header", language: ru) { 
                url
                title 
                child_items { 
                    url 
                    title 
                } 
            }

            uk: allMultilangWpMenuItems(slug: "header", language: uk) { 
                url
                title 
                child_items { 
                    url 
                    title 
                } 
            } 

            en: allMultilangWpMenuItems(slug: "header", language: en) { 
                url
                title 
                child_items { 
                    url 
                    title 
                } 
            } 
        }
    `);

    Object.values(allMultilangWpMenuItems).forEach((data: [MenuItemType]) => {
        makePathKey(data);
    });

    function makePathKey(items: [MenuItemType]) {
        items.forEach((item: MenuItemType) => {
            item.path = item.url.split('.com')[1].replace(/\/+$/, '');
            item.child_items && makePathKey(item.child_items);
        });
    }


    return allMultilangWpMenuItems[language]
}