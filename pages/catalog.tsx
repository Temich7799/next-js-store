import { gql } from "@apollo/client";
import { apolloClient } from "../public/components/Layouts/Layout";
import React from "react"
import Layout from "../public/components/Layouts/Layout";
import CatalogPageContent from "../public/components/Content/CatalogPageContent";
import MetaData from "../public/components/Layouts/MetaData";
import { parsePageMetaData } from "../public/services/parsePageMetaData";

const CatalogPage = ({ catalogPageDataRu }) => {

  const data = catalogPageDataRu;

  return (
    <Layout>
      <CatalogPageContent data={data.allWcProductsCategories} />
    </Layout>
  )
}

export default CatalogPage;

export const Head = ({ catalogPageDataRu }) => {

  const { metaData, openGraphData } = parsePageMetaData(catalogPageDataRu);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}

export async function getStaticProps() {

  const { data } = await apolloClient.query({
    query: gql`
      query getCatalogPageDataRu {
        allWcProductsCategories(params: {hide_empty: true}) {
          image {
            alt
            src
          }
          slug
          name
          description
        }
      
        wpMetaData(pageId: 271, endpoint: pages) {
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