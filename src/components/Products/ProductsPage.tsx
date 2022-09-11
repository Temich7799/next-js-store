import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import styled from "styled-components";
import { GET_ALL_WP_PRODUCTS } from "../../graphql/queries/getAllWpProducts";
import useMobile from "../../services/hooks/useMobile";
import LoadingBar from "../LoadingBar";
import ProductThumb from "./Thumbs/ProductThumb";

type ProductsPageProps = {
    data: Map<number, string>
}

type Product = {
    name: string
    slug: string
    sku: string
    price: string
    sale_price: string
    stock_status: string
    stock_quantity: number
    manage_stock: Boolean
    categories: [
        {
            id: string
            slug: string
        }
    ]
    images?: [
        {
            alt: string
            src: string
        }
    ]
    image: {
        alt: string
        src: string
    }
    wordpress_id: number
    quantity: number
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

    const [getAllWpProducts, { loading: productsLoading, error: productsLoadingError, data: productsData }] = useLazyQuery(GET_ALL_WP_PRODUCTS);

    useEffect(() => {
        getAllWpProducts().then((response) => {
            console.log(response.data);
        });
    }, []);

    return (
        <Main isMobile={isMobile}>
            {
                productsLoading
                    ? <LoadingBar />
                    :
                    <Content>
                        {
                            /*
                            productsData.allWpWcProducts.map((product: Product) =>
                                <ProductThumb data={product} key={product.wordpress_id} />)
                                */
                        }
                    </Content>
            }
        </Main>
    )
}

export default ProductsPage;