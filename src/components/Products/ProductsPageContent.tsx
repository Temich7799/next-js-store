import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import styled from "styled-components";
import { GET_ALL_WP_PRODUCTS } from "../../graphql/queries/getAllWpProducts";
import LoadingBar from "../LoadingBar";
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
  max-width: 1900;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(auto, 200px));
  justify-content: center;
  gap: 50px;
  padding: 2.5%;
`;

const ProductsPageContent = (props: ProductsPageContentProps) => {

    const { gatsbyImages, categoryId } = props;

    const [getAllWpProducts, { loading: productsLoading, error: productsLoadingError, data: productsData }] = useLazyQuery(GET_ALL_WP_PRODUCTS);

    useEffect(() => {
        getAllWpProducts({
            variables: {
                filter: {
                    category: categoryId
                }
            }
        });
    }, []);

    return (
        <>
            {
                productsLoading
                    ? <LoadingBar />
                    :
                    <Content>
                        {
                            productsData && productsData.allWpWcProducts.map((fetchedProduct: FetchedProduct) => {

                                const productId = parseInt(fetchedProduct.id);

                                const gatsbyImage = gatsbyImages.get(productId);

                                const product = {
                                    ...fetchedProduct,
                                    wordpress_id: productId,
                                    image: {
                                        src: gatsbyImage ? gatsbyImage : fetchedProduct.images[0].src,
                                        alt: fetchedProduct.images[0].alt
                                    }
                                };

                                return <ProductThumb data={product} key={product.wordpress_id} />
                            })
                        }
                    </Content>
            }
        </>
    )
}

export default ProductsPageContent;