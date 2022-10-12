import React from "react"
import { graphql } from "gatsby";
import Layout from "../../components/Layouts/Layout";
import CatalogPageContent from "../../components/Content/CatalogPageContent";

const CatalogPage = (props: any) => {

  const { data } = props;

  return (
    <Layout language="en">
      <CatalogPageContent data={data.allWcProductsCategories.edges} />
    </Layout>
  )
}

export default CatalogPage;

export const query = graphql`
  query getAllCategories {
    allWcProductsCategories(filter: {products: {elemMatch: {stock_status: {eq: "instock"}, status: {eq: "publish"}}}}) {
      edges {
        node {
          image {
            alt
            src
          }
          slug
          name
          description
        }
      }
    }
  }
`;