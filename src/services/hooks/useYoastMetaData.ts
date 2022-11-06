import { useState } from "react";

type MetaDataOptions = {
    metaData?: object
    openGraphData?: object
};

function useYoastMetaData(contentEndpoint: string, options?: MetaDataOptions) {

    const [meta, setMeta] = useState<object | any>({});
    const [openGraph, setOpenGraph] = useState<object | any>({});

    fetch(`${process.env.GATSBY_WP_URL}/wp-json/wp/v2/${contentEndpoint}`)
        .then((response) => response.json())
        .then((response) => {
            const data = response && response[0].yoast_head_json;

            setMeta({
                title: data.title,
                description: data.description,
                ...options?.metaData
            });

            const graph: any = {};

            setOpenGraph({
                ...graph,
                ...options?.openGraphData
            });
        });

    return {
        metaData: meta,
        openGraphData: openGraph
    };
}

export default useYoastMetaData;