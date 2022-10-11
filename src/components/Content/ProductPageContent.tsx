import React, { createContext, useContext, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import { GET_RELATED_PRODUCTS_IDS } from "../../graphql/queries/getRelatedProductsIds";
import ProductAbout from "../Products/ProductAbout/ProductAbout";
import ProductDescription from "../Products/ProductDescription";
import ProductGallery from "../Products/ProductGallery/ProductGallery";
import Carousel from "../Carousel";
import ProductThumb from "../Products/Thumbs/ProductThumb";
import { GET_ALL_WP_RELATED_PRODUCTS } from "../../graphql/queries/getAllWpRelatedProducts";
import { LangContext } from "../Layouts/Layout";

type ProductPageContentProps = {
    data: Product
    gatsbyImages?: Map<number, string>
    relatedProductsIds?: Array<string>
}

type Product = {
    name: string
    sku: string
    price: string
    sale_price: string
    description: string
    stock_quantity: number | null
    stock_status: string
    related_products?: [Product]
    wordpress_id?: number
    id: string
    attributes: [
        {
            options: [string]
            name: string
        }
    ]
    images: [
        {
            src: string
            alt: string
            localFile?: object | any
        }
    ]
    image?: {
        src: string
        alt: string
    }
    categories: [
        {
            slug: string
        }
    ]
}

const StyledProductsPageContent = styled.div`
    max-width: 1900px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 25px;
    padding: 5%;
`;

export const PageContext: Product | any = createContext({});

const ProductPageContent = (props: ProductPageContentProps) => {

    const language = useContext(LangContext);
    const { CAROUSEL_RELATED_PRODUCTS_TITLE } = require(`../../languages/${language}/languages`);

    const { data, gatsbyImages, relatedProductsIds } = props;

    data.wordpress_id = parseInt(data.id);
    if (!data.image) data.image = data.images[0];

    const [getRelatedProductsIds, { data: allWpRelatedProductsDataIds }] = useLazyQuery(GET_RELATED_PRODUCTS_IDS, { variables: { productId: data.wordpress_id } });
    const [getAllWpRelatedProducts, { loading: allWpRelatedProductsLoading, data: allWpRelatedProductsData }] = useLazyQuery(GET_ALL_WP_RELATED_PRODUCTS);

    useEffect(() => {
        relatedProductsIds
            ? getAllWpRelatedProducts(
                {
                    variables: {
                        filter: {
                            include: relatedProductsIds
                        }
                    }
                })
            : getRelatedProductsIds()
                .then((response) => {
                    getAllWpRelatedProducts(
                        {
                            variables: {
                                filter: {
                                    include: response.data.wpWcProduct.related_ids.map((id: string) => parseInt(id))
                                }
                            }
                        });
                }
                );
    }, []);

    return (
        <PageContext.Provider value={data}>
            <StyledProductsPageContent>
                <ProductGallery />
                <ProductAbout />
                <ProductDescription />
                {
                    allWpRelatedProductsDataIds !== undefined &&
                    <Carousel title={CAROUSEL_RELATED_PRODUCTS_TITLE} isDataFetching={allWpRelatedProductsLoading} carouselItemMax={3}>
                        {
                            allWpRelatedProductsData !== undefined && allWpRelatedProductsData.allWcProducts.map((fetchedProduct: Product) => {

                                const product = {
                                    ...fetchedProduct,
                                    wordpress_id: parseInt(fetchedProduct.id)
                                };

                                const gatsbyImage = gatsbyImages ? gatsbyImages.get(product.wordpress_id) : undefined;

                                return <ProductThumb data={product} gatsbyImage={gatsbyImage} key={fetchedProduct.id} />
                            })
                        }
                    </Carousel>
                }
            </StyledProductsPageContent >
        </PageContext.Provider>
    )
}

export default ProductPageContent;