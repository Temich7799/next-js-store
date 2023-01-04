import { gql } from "@apollo/client";
import client from "../apollo-client";
import React from "react"
import Layout from "../public/components/Layouts/Layout";
import CatalogPageContent from "../public/components/Content/CatalogPageContent";
import MetaData from "../public/components/Layouts/MetaData";
import { parsePageMetaData } from "../public/services/parsePageMetaData";

const CatalogPage = ({ catalogPageDataRu }) => {

  const data = catalogPageDataRu;

  return (
    <Layout>
      <CatalogPageContent data={data.allMultilangWcCategories} />
    </Layout>
  )
}

export default CatalogPage;

export const Head = ({ catalogPageDataRu }) => {

  const { metaData, openGraphData } = parsePageMetaData(catalogPageDataRu);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}

export async function getStaticProps() {

  const { data } = await client.query({
    query: gql`
      query getCatalogPageDataRu {
        allMultilangWcCategories(params: {hide_empty: true}) {
          image {
            alt
            src
          }
          slug
          name
          description
        }
      
        multilangWpMetaData(pageId: 271, endpoint: pages) {
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
      catalogPageDataRu: data,
    },
  };
}