import React from "react"

type BasicMeta = {
    title: string
    description: string
}

type LinkedData = {
    context: string
    type: string
    name: string
    image?: string
}

type MetaDataProps = {
    metaData: BasicMeta
    linkedData?: LinkedData
    children?: any
}

const MetaData = (props: MetaDataProps) => {

    const { metaData, linkedData, children } = props;

    function jsonLdConstructor(data: LinkedData | any): string {

        let jsonLd: any = {};

        if (data) {

            Object.keys(data).forEach((key: any) => {
                jsonLd[key] = data[key];
            });
        }

        return JSON.stringify(jsonLd);
    }

    return (
        <>
            <title>{metaData.title}</title>
            <meta name="description" content={metaData.description} />
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