import React from "react";
import Layout from "../Layout";
import { HeadProps } from "gatsby";
import ProductPageContent from "../../Content/ProductPageContent";
import { ProductGatsby } from "../../../interfaces/InterfaceProduct";
import MetaData from "../MetaData";
import useYoastMetaData from "../../../services/hooks/useYoastMetaData";

type ProductPageLayoutProps = {
    pageContext: {
        data: ProductGatsby
        language: string
        compImages: object | any
    }
}

const ProductPageLayout = (props: ProductPageLayoutProps) => {

    const { data, language, compImages } = props.pageContext;

    return (
        <Layout language={language}>
            <ProductPageContent data={data} compImages={compImages} />
        </Layout >
    )
}

export default ProductPageLayout;

export const Head = (props: HeadProps) => {

    const { data }: any = props.pageContext;

    const { metaData, openGraphData } = useYoastMetaData(`product?id=${data.id}`, {
        openGraphData: {
            og_url: process.env.GATSBY_SITE_URL
        }
    });

    const linkedData = {
        context: '',
        type: '',
        name: ''
    };

    return <MetaData data={metaData} linkedData={linkedData} openGraphData={openGraphData} />
}
