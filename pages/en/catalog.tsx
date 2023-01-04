import React from "react"
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../../public//components/Layouts/Layout";
import CatalogPageContent from "../../public//components/Content/CatalogPageContent";
import MetaData from "../../public//components/Layouts/MetaData";
import { parsePageMetaData } from "../../public//services/parsePageMetaData";

const CatalogPage = (props: any) => {

  const { data } = props;

  return (
    <Layout language="en">
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
  query getCatalogPageDataEn {
    allMultilangWcCategories(params: {hide_empty: true}, language: en) {
      image {
        alt
        src
      }
      slug
      name
      description
    }
  
    multilangWpMetaData(pageId: 271, endpoint: pages, language: en) {
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