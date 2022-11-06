import React from "react"

type Data = {
    title: string
    description: string
};

type LinkedData = {
    context: string
    type: string
    name: string
    image?: string
};

type OpenGraphData = {
    og_locale: string
    og_type: string
    og_title: string
    og_description: string
    og_url: string
    og_site_name: string
    og_image: [
        {
            url: string
            type: string
            width: number
            height: number
        }
    ]
};

type MetaDataProps = {
    data: Data
    openGraphData?: OpenGraphData | any
    linkedData?: LinkedData
    children?: any
};

const MetaData = (props: MetaDataProps) => {

    const { data, linkedData, openGraphData, children } = props;

    function jsonLdConstructor(data: LinkedData | any): string {

        let jsonLd: any = {};

        if (data) {

            Object.keys(data).forEach((key: any) => {
                jsonLd[key] = data[key];
            });
        }

        return JSON.stringify(jsonLd);
    }

    function formatOpenGraphTag(key: any): string {
        return key.toString().replace(/_/, ':');
    }

    return (
        <>
            <title>{data.title}</title>
            <meta name="description" content={data.description} />
            {
                openGraphData && Object.keys(openGraphData).map((openGraphDataKey: any) =>
                    Array.isArray(openGraphData[openGraphDataKey])
                        ? openGraphData[openGraphDataKey].map((arrayItem: object | any) =>
                            Object.keys(arrayItem).map((itemKey: any) =>
                                <meta property={formatOpenGraphTag(`${openGraphDataKey}:${itemKey}`)} content={arrayItem[itemKey]} />
                            )
                        )
                        : <meta property={formatOpenGraphTag(openGraphDataKey)} content={openGraphData[openGraphDataKey]} />
                )
            }
            {
                linkedData &&
                <script type="application/ld+json">
                    {
                        jsonLdConstructor(linkedData)
                    }
                </script>
            }
            {children}
        </>
    )
}

export default MetaData;