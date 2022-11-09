import React from "react"
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../../components/Layouts/Layout";
import CatalogPageContent from "../../components/Content/CatalogPageContent";
import MetaData from "../../components/Layouts/MetaData";
import { parsePageMetaData } from "../../services/parsePageMetaData";

const CatalogPage = (props: any) => {

  const { data } = props;

  return (
    <Layout language="uk">
      <CatalogPageContent data={data.allMultilangWcCategories} />
    </Layout>
  )
}

export default CatalogPage;

export const Head = (props: any) => {

  const { metaData, openGraphData } = parsePageMetaData(props.data.multilangWpMetaData);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}

export const query = graphql`
  query getCatalogPageDataUk {
    allMultilangWcCategories(params: {hide_empty: true}, language: uk) {
      image {
        alt
        src
      }
      slug
      name
      description
    }
  
    multilangWpMetaData(pageId: 271, endpoint: pages, language: uk) {
        title
        description
        og_title
        og_type
        og_locale
        og_site_name
        og_description
      }
  }
`;