import { graphql, useStaticQuery } from "gatsby"
import { MenuItemType } from "../../../types/MenuItemType";

export const useHeaderMenuItems = (language: string = 'ru'): [MenuItemType] => {

    const allMultilangWpMenuItems = useStaticQuery(graphql`

        query getAllMultilangHeaderMenuItems { 

            ru: allMultilangWpMenuItems(slug: "header", language: ru) { 
                url
                title
                slug 
                child_items { 
                    url 
                    title 
                } 
            }

            uk: allMultilangWpMenuItems(slug: "header", language: uk) { 
                url
                title 
                slug
                child_items { 
                    url 
                    title 
                } 
            } 

            en: allMultilangWpMenuItems(slug: "header", language: en) { 
                url
                title 
                slug
                child_items { 
                    url 
                    title 
                } 
            } 
        }
    `);

    Object.values(allMultilangWpMenuItems).forEach((data: any) => {
        makePath(data);
    });

    function makePath(items: [MenuItemType]) {
        items.forEach((item: MenuItemType) => {
            item.path = item.url.split('.com')[1].replace(/\/+$/, '').replace('home', '');
            item.child_items && makePath(item.child_items);
        });
    }

    return allMultilangWpMenuItems[language];
}