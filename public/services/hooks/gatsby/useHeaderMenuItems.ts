import { gql } from "@apollo/client";
import client from "../../../../apollo-client";
import { MenuItemType } from "../../../types/MenuItemType";

export const useHeaderMenuItems = async (language: string = 'ru'): [MenuItemType] => {

    const { data } = await client.query({
        query: gql`
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
        `
    });

    Object.values(data).forEach((data: any) => {
        makePath(data);
    });

    function makePath(items: [MenuItemType]) {
        items.forEach((item: MenuItemType) => {
            item.path = item.url.split('.com')[1].replace(/\/+$/, '').replace('home', '');
            item.child_items && makePath(item.child_items);
        });
    }

    return data[language];
}