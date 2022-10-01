import { useState } from "react";

type MetaDataOptions = {
    metaData?: object
    openGraphData?: object
};

function useYoastMetaData(contentEndpoint: string, options?: MetaDataOptions) {

    const urlOrigin = `https://${process.env.GATSBY_WC_URL}`;
    const urlContent = `${urlOrigin}${contentEndpoint}`;

    const [meta, setMeta] = useState<object | any>({});
    const [openGraph, setOpenGraph] = useState<object | any>({});

    fetch(`${urlOrigin}/wp-json/yoast/v1/get_head?url=${urlContent}`)
        .then((response) => response.json())
        .then((data) => {

            setMeta({
                title: data.json.title,
                description: data.json.description,
                ...options?.metaData
            });

            const graph: any = {};

            Object.keys(data.json).forEach((openGraphKey) => {
                if (
                    openGraphKey !== 'og_locale' && openGraphKey !== 'og_url' &&
                    openGraphKey !== 'schema' && openGraphKey !== 'robots' &&
                    openGraphKey !== 'title' && openGraphKey !== 'description'
                ) {
                    graph[openGraphKey] = data.json[openGraphKey];
                }
            });

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