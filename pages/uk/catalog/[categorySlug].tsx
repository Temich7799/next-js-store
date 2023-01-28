import React from "react";
import BaseTemplate from "../../../public/templates/BaseTemplate";
import ProductsListPageTemplate from "../../../public/templates/ProductsListPageTemplate";
import { getProductsListPageData } from "../../../public/services/getProductsListPageData";
import { getMenuItems } from "../../../public/services/getMenuItems"

const ProductsListPage = ({ menuItemsData, productsListPageData }) => {

  return (
    <BaseTemplate data={menuItemsData} language="uk" >
      <ProductsListPageTemplate data={productsListPageData.data} queryParams={{ category: productsListPageData.categoryId }} />
    </BaseTemplate>
  )
}

export default ProductsListPage;

export async function getServerSideProps({ params }) {

  const language = 'uk';

  return {
    props: {
      productsListPageData: await getProductsListPageData(params.categorySlug),
      menuItemsData: await getMenuItems(language)
    }
  }
}