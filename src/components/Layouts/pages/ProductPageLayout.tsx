import React from "react";
import Layout from "../Layout";
import ProductPageContent from "../../Content/ProductPageContent";
import { ProductGatsby } from "../../../types/InterfaceProduct";

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