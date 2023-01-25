import React from "react";
import BaseTemplate from "../../public/templates/BaseTemplate";
import ProductsListPageTemplate from "../../public/templates/ProductsListPageTemplate";
import { getServerSidePropsForProductsListPageTemplate } from "../../public/services/getServerSidePropsForProductsListPageContent";
import { getMenuItems } from "../../public/services/getMenuItems"

const ProductsListPage = (props: any) => {

  return (
    <BaseTemplate data={props.menuItemsData} language="ru" >
      <ProductsListPageTemplate data={props.productsListPageData.data} categoryId={props.productsListPageData.categoryId} />
    </BaseTemplate>
  )
}

export default ProductsListPage;

export async function getServerSideProps({ params }) {

  const language = 'ru';

  return {
    props: {
      productsListPageData: await getServerSidePropsForProductsListPageTemplate(params),
      menuItemsData: await getMenuItems(language)
    }
  }
}