import React from "react";
import Layout from "../../../public/components/Layouts/Layout";
import ProductsListPageContent from "../../../public/components/Content/ProductsListPageContent";
import { getServerSidePropsForProductsListPageContent } from "../../../public/services/getServerSidePropsForProductsListPageContent";
import { getMenuItems } from "../../../public/services/getMenuItems"

const ProductsListPage = (props: any) => {

  return (
    <Layout data={props.menuItemsData} language="uk" >
      <ProductsListPageContent data={props.productsListPageData.data} categoryId={props.productsListPageData.categoryId} />
    </Layout>
  )
}

export default ProductsListPage;

export async function getServerSideProps({ params }) {

  const language = 'uk';

  return {
    props: {
      productsListPageData: await getServerSidePropsForProductsListPageContent(params),
      menuItemsData: await getMenuItems(language)
    }
  }
}