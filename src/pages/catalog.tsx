import { graphql } from "gatsby";
import React, { useEffect, useState } from "react"
import styled from "styled-components";
import Layout from "../components/Layouts/MainLayout";
import CategoryThumb from "../components/Product/Thumbs/CategoryThumb";
import PageTitle from "../components/PageTitle";
import useWindowDimensions from "../services/hooks/useWindowDimensions";

const Main = styled.main<any>`
  margin-top: ${props => props.isMobile ? "125px" : "0"};
`;

const Content = styled.div`
  max-width: 1900px;
  margin: 0 auto;
  padding: 2.5%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  column-gap: 25px;
  row-gap: 50px;
`

type CatalogProps = {
  data: {
    allWcProductsCategories: {
      edges: Array<object>
    }
  }
}

const CatalogPage = (props: CatalogProps) => {

  const { data } = props;

  const { deviceHeight, deviceWidth } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => setIsMobile(deviceWidth < 820 ? true : false), [deviceWidth]);

  return (
    <>
      <Layout>
        <>
          <Main isMobile={isMobile}>
            <PageTitle>Catalog</PageTitle>
            <Content>
              {data.allWcProductsCategories.edges.map((edge: any) => <CategoryThumb data={edge.node} />)}
            </Content>
          </Main>
        </>
      </Layout>
    </>
  )
}

export default CatalogPage;

export const query = graphql`
query getCategories {
  allWcProductsCategories {
    edges {
      node {
        image {
          alt
          src
        }
        slug
        name
        description
      }
    }
  }
}
`;