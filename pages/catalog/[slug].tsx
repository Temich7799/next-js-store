import React from "react";
import Layout from "../../public/components/Layouts/Layout";
import ProductsListPageContent from "../../public/components/Content/ProductsListPageContent";
import { getServerSidePropsForProductsListPageContent } from "../../public/services/getServerSidePropsForProductsListPageContent";

const ProductsListPage = ({ categoryId, data }) => {

  return (
    <Layout language="ru" >
      <ProductsListPageContent data={data} categoryId={categoryId} />
    </Layout>
  )
}

export default ProductsListPage;

export async function getServerSideProps({ params }) {
  return await getServerSidePropsForProductsListPageContent(params);
}