import React from "react";
import Layout from "../Layout";
import ProductsListPageContent from "../../Content/ProductsListPageContent";

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