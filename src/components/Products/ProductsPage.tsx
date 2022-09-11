import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import styled from "styled-components";
import { GET_ALL_WP_PRODUCTS } from "../../graphql/queries/getAllWpProducts";
import useMobile from "../../services/hooks/useMobile";

type ProductsPageProps = {
    data: Map<number, string[]>
}

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
`;

const ProductsPage = (props: ProductsPageProps) => {

    const { data } = props;

    const isMobile = useMobile();

    const [getAllWpProducts] = useLazyQuery(GET_ALL_WP_PRODUCTS);

    useEffect(() => {
        console.log(getAllWpProducts());
    }, []);

    return (
        <Main isMobile={isMobile}>
            <Content>
                {
                    /*
                    data.allWcProducts.edges.map((edge: Product) => {
                      console.log(edge.node.stock_status)
                      const isProductInStock = (edge.node.stock_quantity !== null && edge.node.stock_quantity > 0) || edge.node.stock_status == 'instock';
                      const isCategoryMatch = typeof document !== `undefined` && document.location.href.split('/catalog/')[1] == edge.node.categories[0].slug;
                      return (
                        isProductInStock && isCategoryMatch && <ProductThumb data={edge.node} key={edge.node.wordpress_id} />)
                    })
                    */
                }
            </Content>
        </Main>
    )
}

export default ProductsPage;