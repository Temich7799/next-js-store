import React from "react";
import BaseTemplate from "../../public/templates/BaseTemplate";
import ProductsListPageTemplate from "../../public/templates/ProductsListPageTemplate";
import { getProductsListPageData } from "../../public/services/getProductsListPageData";
import { getMenuItems } from "../../public/services/getMenuItems"
import MetaData from "../../public/components/MetaData";

const ProductsListPage = ({ menuItemsData, productsListPageData }) => {

  const { categoryId, metaData: meta, openGraphData } = productsListPageData;

  return (
    <>
      <MetaData data={meta} openGraphData={openGraphData} />
      <BaseTemplate data={menuItemsData} language="ru" >
        <ProductsListPageTemplate data={productsListPageData.data} queryParams={{ category: categoryId }} />
      </BaseTemplate>
    </>
  )
}

export default ProductsListPage;

export async function getServerSideProps({ params }) {

  const language = 'ru';

  return {
    props: {
      productsListPageData: await getProductsListPageData(params.categorySlug),
      menuItemsData: await getMenuItems(language)
    }
  }
}