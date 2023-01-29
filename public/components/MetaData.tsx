import React from "react"
import Head from 'next/head';

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
        <Head>
            <title>{data.title}</title>
            <meta name="description" content={data.description} />
            <meta name="theme-color" content="#9ed6e4"></meta>
            <meta name="viewport" content="width=device-width, user-scalable=no" />
            {
                openGraphData && Object.keys(openGraphData).map((openGraphDataKey: any, index: number) =>
                    Array.isArray(openGraphData[openGraphDataKey])
                        ? openGraphData[openGraphDataKey].map((arrayItem: object | any) =>
                            Object.keys(arrayItem).map((itemKey: any, index: number) =>
                                <meta property={formatOpenGraphTag(`${openGraphDataKey}:${itemKey}`)} content={arrayItem[itemKey]} key={index} />
                            )
                        )
                        : <meta property={formatOpenGraphTag(openGraphDataKey)} content={openGraphData[openGraphDataKey]} key={index} />
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
            <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_CONTENT} />
        </Head>
    )
}

export default MetaData;