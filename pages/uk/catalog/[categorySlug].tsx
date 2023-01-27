import React from "react";
import BaseTemplate from "../../../public/templates/BaseTemplate";
import ProductsListPageTemplate from "../../../public/templates/ProductsListPageTemplate";
import { getServerSidePropsForProductsListPageTemplate } from "../../../public/services/getServerSidePropsForProductsListPageContent";
import { getMenuItems } from "../../../public/services/getMenuItems"

const ProductsListPage = ({ menuItemsData, productsListPageData }) => {

  return (
    <BaseTemplate data={menuItemsData} language="uk" >
      <ProductsListPageTemplate data={productsListPageData.data} categoryId={productsListPageData.categoryId} />
    </BaseTemplate>
  )
}

export default ProductsListPage;

export async function getServerSideProps({ params }) {

  const language = 'uk';

  return {
    props: {
      productsListPageData: await getServerSidePropsForProductsListPageTemplate(params),
      menuItemsData: await getMenuItems(language)
    }
  }
}