import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

type MetaDataOptions = {
    metaData?: object
    openGraphData?: object
};

function usePageMetaData(pageId: number, contentEndpoint: string, language: string = 'ru', options?: MetaDataOptions) {

    const [meta, setMeta] = useState<object | any>({});
    const [openGraph, setOpenGraph] = useState<object | any>({});

    const { data } = useQuery(gql`
        query getPageMetaData($pageId: Int!, $language: LanguagesEnum, $endpoint: RestEndpointsEnum!) {
            wpMetaData(pageId: $pageId, endpoint: $endpoint, language: $language) {
                title
                description
                og_title
                og_type
                og_locale
                og_site_name
                og_description
            }
        }
    `, {
        variables: {
            endpoint: contentEndpoint,
            language: language,
            pageId: pageId
        }
    });

    setMeta({
        title: data.title,
        description: data.description,
        ...options?.metaData
    });

    const graph: any = {
        og_title: data.og_title,
        og_type: data.og_type,
        og_locale: data.og_locale,
        og_site_name: data.og_site_name,
        og_description: data.og_description
    };

    setOpenGraph({
        ...graph,
        ...options?.openGraphData
    });


    return {
        metaData: meta,
        openGraphData: openGraph
    };
}

export default usePageMetaData;