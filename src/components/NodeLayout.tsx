import * as React from "react";
import Layout from "./Layout";
import { graphql } from "gatsby";

const NodeLayout = ({ data }: any) => {
  console.log(data);
  return (
    <>
      <Layout>
        {(data.wpPage.content) ? <main dangerouslySetInnerHTML={{ __html: data.wpPage.content }} /> : '404'}
      </Layout>
    </>
  )
}

export default NodeLayout

export const query = graphql`
query ($slug: String!) {
    wpPage(slug: {eq: $slug}) {
      content
      title
    }
  } 
`


