import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
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
    images: [
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
    id: number
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

    const [products, setProducts] = useState<Array<Product>>([]);

    const [getAllWpProducts, { loading: productsLoading, error: productsLoadingError, data: productsData }] = useLazyQuery(GET_ALL_WP_PRODUCTS);

    useEffect(() => {
        getAllWpProducts();
    }, []);

    return (
        <Main isMobile={isMobile}>
            {
                productsLoading
                    ? <LoadingBar />
                    :
                    <Content>
                        {
                            productsData && productsData.allWpWcProducts.map((product: Product) => {

                                const gatsbyImage = data.get(product.id);

                                product = {
                                    ...product,
                                    image: {
                                        src: gatsbyImage ? gatsbyImage : product.images[0].src,
                                        alt: product.images[0].alt
                                    }
                                };

                                return <ProductThumb data={product} key={product.id} />
                            })
                        }
                    </Content>
            }
        </Main>
    )
}

export default ProductsPage;