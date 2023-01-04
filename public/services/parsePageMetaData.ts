import { HeadMetaDataType } from "../types/HeadMetaDataType";
import { PageMetaDataType } from "../types/PageMetaDataType";


export function parsePageMetaData(data: PageMetaDataType): HeadMetaDataType {
    return {
        metaData: {
            title: data.title,
            description: data.description
        },
        openGraphData: {
            og_title: data.og_title,
            og_type: data.og_type,
            og_locale: data.og_locale,
            og_site_name: data.og_site_name,
            og_description: data.og_description
        }
    }
}