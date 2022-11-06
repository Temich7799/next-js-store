import React from "react";
import Layout from "../Layout";
import ProductsListPageContent from "../../Content/ProductsListPageContent";
import { HeadProps } from "gatsby";
import MetaData from "../MetaData";
import useYoastMetaData from "../../../services/hooks/useYoastMetaData";

type ProductsListPageLayoutProps = {
  pageContext: {
    compImages: object | any
    categoryId: string
    language: string
  }
}

const ProductsListPageLayout = (props: ProductsListPageLayoutProps) => {

  const { compImages, categoryId, language } = props.pageContext;

  return (
    <Layout language={language}>
      <ProductsListPageContent compImages={compImages} categoryId={categoryId} />
    </Layout>
  )
}

export default ProductsListPageLayout;

export const Head = (props: HeadProps) => {

  const { categoryId }: any = props.pageContext;

  const { metaData, openGraphData } = useYoastMetaData(`categories?id=${categoryId}`, {
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