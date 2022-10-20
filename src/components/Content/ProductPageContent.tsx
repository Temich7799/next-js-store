import React, { createContext, useContext } from "react";
import styled from "styled-components";
import ProductAbout from "../Products/ProductAbout/ProductAbout";
import ProductDescription from "../Products/ProductDescription";
import ProductGallery from "../Products/ProductGallery/ProductGallery";
import Carousel from "../Carousel";
import ProductThumb from "../Products/Thumbs/ProductThumb";
import { LangContext } from "../Layouts/Layout";
import { useRelatedProducts } from "../../services/hooks/graphql/useRelatedProducts";
import { ProductFetched, ProductGatsby } from "../../interfaces/InterfaceProduct";

type ProductPageContentProps = {
    data: ProductGatsby
    compImages?: any | undefined
}

const StyledProductsListPageContent = styled.div`
    max-width: 1900px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 25px;
    padding: 5%;
`;

export const ProductPageContext: React.Context<ProductGatsby> = createContext({});

const ProductPageContent = (props: ProductPageContentProps) => {

    const { language } = useContext(LangContext);
    const { CAROUSEL_RELATED_PRODUCTS_TITLE } = require(`../../languages/${language}/languages`);

    const { data, compImages } = props;

    const { data: relatedProductsData, loading } = useRelatedProducts(data && data.related_ids);

    return (
        <ProductPageContext.Provider value={data}>
            <StyledProductsListPageContent>
                <ProductGallery compImages={compImages} />
                <ProductAbout />
                <ProductDescription />
                {
                    data && data.related_ids.length > 0 &&
                    <Carousel title={CAROUSEL_RELATED_PRODUCTS_TITLE} isDataFetching={loading} carouselItemMax={3}>
                        {
                            relatedProductsData !== undefined && relatedProductsData.map((product: ProductFetched) => {

                                const productCompImages = compImages && compImages[parseInt(product.id)];
                                const gatsbyImagePath = productCompImages && productCompImages.length >= 1 && productCompImages[0];

                                return <ProductThumb data={product} gatsbyImagePath={gatsbyImagePath} key={product.id} />
                            })
                        }
                    </Carousel>
                }
            </StyledProductsListPageContent >
        </ProductPageContext.Provider>
    )
}

export default ProductPageContent;