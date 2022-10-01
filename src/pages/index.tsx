import React from "react"
import Layout from "../components/Layouts/MainLayout";
import { graphql, HeadProps } from "gatsby"
import styled from "styled-components";
import useMobile from "../services/hooks/useMobile"
import MetaData from "../components/Layouts/MetaData";
import parseYoastMetaData from "../services/hooks/useYoastMetaData";
import useYoastMetaData from "../services/hooks/useYoastMetaData";

type IndexProps = {
  data: {
    wpPage: {
      content: string
    }
  }
};

const Main = styled.main<any>`
  margin-top: ${props => props.isMobile ? "125px" : "0"};
`;

const Content = styled.div`
    max-width: 1700px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 50px;
    padding: 2.5%;
`;

const IndexPage = (props: IndexProps) => {

  const { data } = props;

  const isMobile = useMobile();

  return (
    <Layout>
      <Main isMobile={isMobile}>
        {
          (data.wpPage.content) && <Content dangerouslySetInnerHTML={{ __html: data.wpPage.content }} />
        }
      </Main>
    </Layout>
  )
}

export default IndexPage

export const Head = (props: HeadProps) => {

  const { metaData, openGraphData } = useYoastMetaData('/home/', {
    openGraphData: {
      og_url: process.env.GATSBY_SITE_URL
    }
  });

  const linkedData = {
    context: 'artem',
    type: 'temich',
    name: 'artemon'
  };

  return <MetaData data={metaData} linkedData={linkedData} openGraphData={openGraphData} />
}

export const query = graphql`
  query getHomePage {
    wpPage(slug: {eq: "home"}) {
      content
      title
    }
  }
`;
