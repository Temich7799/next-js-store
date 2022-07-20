import * as React from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import styled from "styled-components";

const Main = styled.main`

`;

type ProductProps = {
    data: any
}

const ProductLayout = (props: ProductProps) => {

    const { data } = props;

    console.log(data);

    return (
        <Layout>
            <Main>
            
            </Main>
        </Layout>
    )
}

export default ProductLayout

export const query = graphql`
  query getProduct($slug: String!){
    wcProducts(slug: { eq: $slug }){
        price
        sale_price
      related_products {
            name
            price
            sale_price
            sku
        images {
                alt
                src
            }
            purchasable
        }
        description
      dimensions {
            height
            length
            width
        }
      images {
            alt
            src
        }
      categories {
            slug
        }
        name
        purchasable
        sku
    }
}
`;

