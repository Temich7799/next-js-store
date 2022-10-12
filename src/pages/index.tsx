import React from "react"
import Layout from "../components/Layouts/Layout";
import { graphql } from "gatsby"
import IndexPageContent from "../components/Content/IndexPageContent";

const IndexPage = (props: any) => {

  const { data } = props;

  return (
    <Layout>
      <IndexPageContent data={data.wpPage} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query getHomePage {
    wpPage(slug: {eq: "home"}) {
      content
      title
    }
  }
`;
