import React from "react"
import { graphql } from "gatsby";
import Layout from "../../components/Layouts/Layout";
import CatalogPageContent from "../../components/Content/CatalogPageContent";

const CatalogPage = (props: any) => {

  const { data } = props;

  return (
    <Layout language="en">
      <CatalogPageContent data={data.allMultilangWcCategories} />
    </Layout>
  )
}

export default CatalogPage;

export const query = graphql`
  query getAllCategories {
    allMultilangWcCategories(params: {hide_empty: true}, language: en) {
      image {
        alt
        src
      }
      slug
      name
      description
    }
  }
`;