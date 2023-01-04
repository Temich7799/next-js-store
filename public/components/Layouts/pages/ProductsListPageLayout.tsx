import React from "react";
import Layout from "../Layout";
import ProductsListPageContent from "../../Content/ProductsListPageContent";
import MetaData from "../MetaData";
import { parsePageMetaData } from "../../../services/parsePageMetaData";

type ProductsListPageLayoutProps = {
  pageContext: {
    pageData: any
    compImages: object | any
    language: string
  }
}

const ProductsListPageLayout = (props: ProductsListPageLayoutProps) => {

  const { compImages, pageData, language } = props.pageContext;

  return (
    <Layout language={language}>
      <ProductsListPageContent compImages={compImages} categoryId={pageData.id} />
    </Layout>
  )
}

export default ProductsListPageLayout;

export const Head = (props: any) => {

  const { metaData, openGraphData } = parsePageMetaData(props.pageContext.pageData.yoast_head_json);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}
