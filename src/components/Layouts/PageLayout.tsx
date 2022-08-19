import React, { useEffect, useState } from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import PageTitle from "../PageTitle";
import styled from "styled-components";
import useWindowDimensions from "../../services/hooks/useWindowDimensions";
require('../../styles/wp.css');

const Main = styled.main<any>`
  margin-top: ${props => props.isMobile ? "125px" : "0"};
`;

const Content = styled.div`
    max-width: 1900px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 50px;
    padding: 2.5%;
`;

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

  const { deviceHeight, deviceWidth } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => setIsMobile(deviceWidth < 820 ? true : false), [deviceWidth]);

  return (
    <>
      <Layout>
        <Main isMobile={isMobile}>
          <PageTitle>{data.wpPage.title}</PageTitle>
          {(data.wpPage.content) ? <Content dangerouslySetInnerHTML={{ __html: data.wpPage.content }} /> : '404'}
        </Main>
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


