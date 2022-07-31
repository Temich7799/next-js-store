import * as React from "react"
import Layout from "../components/Layouts/MainLayout";
import { graphql } from "gatsby"

type IndexProps = {
  data: {
    wpPage: {
      content: string
    }
  }
}

const IndexPage = (props: IndexProps) => {

  const { data } = props;

  return (
    <>
      <Layout>
        {(data.wpPage.content) && <main dangerouslySetInnerHTML={{ __html: data.wpPage.content }} />}
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
