import React from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import PageTitle from "../PageTitle";
import styled from "styled-components";
import MetaData from "./MetaData";
require('../../styles/wp.css');
import type { HeadProps } from "gatsby"

type PageProps = {
  data: {
    wpPage: {
      content: string
      title: string
    }
  }
}

const Content = styled.div`
    max-width: 1700px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 50px;
    padding: 2.5%;
`;

const PageLayout = (props: PageProps) => {

  const { data } = props;

  return (
    <Layout>
      <main>
        <PageTitle>{data.wpPage.title}</PageTitle>
        {(data.wpPage.content) ? <Content dangerouslySetInnerHTML={{ __html: data.wpPage.content }} /> : '404'}
      </main>
    </Layout>
  )
}

export default PageLayout

export const Head = (headProps: HeadProps) => {

  const metaData = {
    title: 'title',
    description: 'description'
  };

  const linkedData = {
    context: 'context',
    type: 'type',
    name: 'name'
  };

  return <MetaData metaData={metaData} linkedData={linkedData} />
}

export const query = graphql`
  query ($slug: String!) {
      wpPage(slug: {eq: $slug}) {
        content
        title
      }
    } 
`;


