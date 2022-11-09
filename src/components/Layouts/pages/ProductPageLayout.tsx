import React from "react";
import Layout from "../Layout";
import ProductPageContent from "../../Content/ProductPageContent";
import { ProductGatsby } from "../../../interfaces/InterfaceProduct";
import MetaData from "../MetaData";
import { parsePageMetaData } from "../../../services/parsePageMetaData";

type ProductPageLayoutProps = {
    pageContext: {
        productData: ProductGatsby
        language: string
        compImages: object | any
    }
}

const ProductPageLayout = (props: ProductPageLayoutProps) => {

    const { productData, language, compImages } = props.pageContext;

    return (
        <Layout language={language}>
            <ProductPageContent data={productData} compImages={compImages} />
        </Layout >
    )
}

export default ProductPageLayout;

export const Head = (props: any) => {

    const { metaData, openGraphData } = parsePageMetaData(props.pageContext.productData.yoast_head_json);

    return <MetaData data={metaData} openGraphData={openGraphData} />
}