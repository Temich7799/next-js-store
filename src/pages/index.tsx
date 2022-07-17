import * as React from "react"
import Layout from "../components/Layouts/MainLayout";
import { graphql } from "gatsby"

const IndexPage = ({ data }: any) => {
  console.log(data.wpPage.content);
  return (
    <>
      <Layout>
        {(data.wpPage.content) ? <main dangerouslySetInnerHTML={{ __html: data.wpPage.content }} /> : '404'}
      </Layout>
    </>
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

`
