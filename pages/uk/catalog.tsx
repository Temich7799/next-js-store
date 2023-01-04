import React from "react"
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Layout from "../../public//components/Layouts/Layout";
import CatalogPageContent from "../../public//components/Content/CatalogPageContent";
import MetaData from "../../public//components/Layouts/MetaData";
import { parsePageMetaData } from "../../public//services/parsePageMetaData";

const CatalogPage = ({ catalogPageDataUk }) => {

  const data = catalogPageDataUk;

  return (
    <Layout language="uk">
      <CatalogPageContent data={data.allMultilangWcCategories} />
    </Layout>
  )
}

export default CatalogPage;

export const Head = ({ catalogPageDataUk }) => {

  const { metaData, openGraphData } = parsePageMetaData(catalogPageDataUk.multilangWpMetaData);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}

export async function getStaticProps() {

  const { data } = await client.query({
    query: gql`
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
    `,
  });

  return {
    props: {
      catalogPageDataUk: data,
    },
  };
}