import * as React from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import PageTitle from "../PageTitle";

type PageProps = {
  data: {
    wpPage: {
      content: string
      title: string
    }
  }
}

const PageLayout = (props: PageProps) => {

  const { data } = props;

  return (
    <>
      <Layout>
        <>
          <PageTitle>{data.wpPage.title}</PageTitle>
          {(data.wpPage.content) ? <main dangerouslySetInnerHTML={{ __html: data.wpPage.content }} /> : '404'}
        </>
      </Layout>
    </>
  )
}

export default PageLayout

export const query = graphql`
query ($slug: String!) {
    wpPage(slug: {eq: $slug}) {
      content
      title
    }
  } 
`


