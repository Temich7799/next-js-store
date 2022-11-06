import React from "react"
import { graphql, HeadProps } from "gatsby";
import Layout from "../../components/Layouts/Layout";
import CatalogPageContent from "../../components/Content/CatalogPageContent";
import useYoastMetaData from "../../services/hooks/useYoastMetaData";
import MetaData from "../../components/Layouts/MetaData";

const CatalogPage = (props: any) => {

  const { data } = props;

  return (
    <Layout language="uk">
      <CatalogPageContent data={data.allMultilangWcCategories} />
    </Layout>
  )
}

export default CatalogPage;

export const Head = (props: HeadProps) => {

  const { metaData, openGraphData } = useYoastMetaData('pages?slug=catalog', {
    openGraphData: {
      og_url: `${process.env.GATSBY_SITE_URL}/catalog`
    }
  });

  const linkedData = {
    context: '',
    type: '',
    name: ''
  };

  return <MetaData data={metaData} linkedData={linkedData} openGraphData={openGraphData} />
}

export const query = graphql`
  query getAllCategories {
    allMultilangWcCategories(params: {hide_empty: true}, language: uk) {
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