import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GET_ALL_WP_PRODUCTS } from "../../graphql/queries/getAllWpProducts";
import { extendProductByMatchingImages } from "../../services/extendProductByMatchingImages";
import ContainerCentered from "../../styles/ContainerCentered";
import LoadingBar from "../LoadingBars/LoadingBar";
import ProductThumb from "./Thumbs/ProductThumb";

type ProductsPageContentProps = {
    gatsbyImages: Map<number, string>
    categoryId: string
}

type FetchedProduct = {
    name: string
    slug: string
    sku: string
    price: string
    sale_price: string
    stock_quantity: number
    stock_status: string
    id: string
    categories: [
        {
            slug: string
        }
    ]
    images: [
        {
            alt: string
            src: string
        }
    ]
}

const Content = styled.div`
    max-width: 1900px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(auto, 200px));
    justify-content: center;
    gap: 50px;
    padding: 2.5%;
`;

const ProductsPageContent = (props: ProductsPageContentProps) => {

    const { gatsbyImages, categoryId } = props;

    const [fetchOffset, setFetchOffset] = useState<number>(0);
    const [fetchLimit, setFetchLimit] = useState<number>(50);

    const [getAllWpProducts, { loading: productsLoading, data: productsData, fetchMore }] = useLazyQuery(GET_ALL_WP_PRODUCTS);

    useEffect(() => {
        setFetchLimit(Math.floor((window.innerHeight * window.innerWidth) / 10000));
        getAllWpProducts({
            variables: {
                filter: {
                    category: categoryId,
                    stock_status: 'instock',
                    status: 'publish',
                    per_page: Math.floor((window.innerHeight * window.innerWidth) / 10000),
                    offset: fetchOffset
                }
            }
        }).then((response) => {
            setFetchOffset(response.data.allWpWcProducts.length + fetchOffset);
        });

    }, []);

    useEffect(() => {

        window.addEventListener('scroll', onScrollHandler);

        return () => {
            window.removeEventListener('scroll', onScrollHandler);
        }
    }, [fetchOffset])

    function onScrollHandler() {

        if (window.scrollY > (document.documentElement.scrollHeight - document.documentElement.clientHeight) / 3) {

            window.removeEventListener('scroll', onScrollHandler);

            fetchMore(
                {
                    variables: {
                        filter: {
                            category: categoryId,
                            stock_status: 'instock',
                            status: 'publish',
                            per_page: fetchLimit,
                            offset: fetchOffset
                        }
                    }
                }
            ).then((response) => {
                setFetchOffset(response.data.allWpWcProducts.length + fetchOffset);
            });
        }
    }

    return (
        <>
            {
                productsLoading
                    ?
                    <ContainerCentered>
                        <LoadingBar />
                    </ContainerCentered>
                    :
                    <Content>
                        {
                            productsData && productsData.allWpWcProducts.map((fetchedProduct: FetchedProduct) => {

                                const product = extendProductByMatchingImages(fetchedProduct, gatsbyImages);
                                const url = `${process.env.GATSBY_SITE_URL}/catalog/${product.categories[0].slug}/${product.categories[0].slug}-${product.sku}`;

                                return <ProductThumb data={product} url={url} key={product.wordpress_id} />
                            })
                        }
                    </Content>
            }
        </>
    )
}

export default ProductsPageContent;