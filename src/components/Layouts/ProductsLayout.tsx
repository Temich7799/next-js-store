import React, { useEffect, useState } from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import ProductThumb from "../Product/Thumbs/ProductThumb";
import styled from "styled-components";
import useWindowDimensions from "../../services/hooks/useWindowDimensions";

const Main = styled.main<any>`
    margin-top: ${props => props.isMobile ? "125px" : "0"};
`;

const Content = styled.div`
  max-width: 1900;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(auto, 200px));
  justify-content: center;
  gap: 50px;
  padding: 2.5%;
`

type ProductsProps = {
  data: {
    allWcProducts: {
      edges: Array<object>
    }
  }
}

const ProductsLayout = (props: ProductsProps) => {

  const { data } = props;

  const { deviceHeight, deviceWidth } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => setIsMobile(deviceWidth < 820 ? true : false), [deviceWidth]);

  return (
    <Layout>
      <Main isMobile={isMobile}>
        <Content>
          {
            data.allWcProducts.edges.map((edge: any) =>
              document.location.href.split('/catalog/')[1] == edge.node.categories[0].slug &&
              <ProductThumb data={edge.node} />)
          }
        </Content>
      </Main>
    </Layout>
  )
}

export default ProductsLayout

export const query = graphql`
  query getProducts {
    allWcProducts {
      edges {
        node {
          name
          price
          sku
          purchasable
          sale_price
          slug
          images {
            src
            alt
          }
          categories {
            slug
          }
          attributes {
            options
            name
        }
        wordpress_id
        }
      }
    }
  }
`;

