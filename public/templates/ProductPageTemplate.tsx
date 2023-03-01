import React, { createContext } from "react";
import styled from "styled-components";
import ProductAbout from "../components/Product/ProductAbout/ProductAbout";
import ProductDescription from "../components/Product/ProductDescription";
import ProductGallery from "../components/Product/ProductGallery/ProductGallery";
import { Product } from "../interfaces/InterfaceProduct";
import LastSeenProductsCarousel from "../components/Carousel/LastSeenProductsCarousel";
import OnSaleProductsCarousel from "../components/Carousel/OnSaleProductsCarousel";
import RelatedProductsCarousel from "../components/Carousel/RelatedProductsCarousel";

type ProductPageTemplateProps = {
    data: Product
    compImages?: any | undefined
}

const StyledProductsListPageTemplate = styled.div`
    max-width: 1900px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10%;
    padding: 5%;
`;

export const ProductPageContext = createContext<Product>({
    price: "",
    sale_price: "",
    stock_quantity: 0,
    yoast_head_json: {
        og_url: ""
    },
    id: "",
    name: "",
    sku: "",
    images: [],
    categories: [],
    description: "",
    related_ids: [],
    attributes: []
});

const ProductPageTemplate = (props: ProductPageTemplateProps) => {

    const { data, compImages } = props;

    return (
        <ProductPageContext.Provider value={data}>
            <StyledProductsListPageTemplate>
                <ProductGallery compImages={compImages} />
                <ProductAbout />
                <ProductDescription />
                <OnSaleProductsCarousel maxItemsPerSlide={3} />
                <LastSeenProductsCarousel maxItemsPerSlide={3} />
                <RelatedProductsCarousel data={data} compImages={compImages} options={{ maxItemsPerSlide: 3 }} />
            </StyledProductsListPageTemplate >
        </ProductPageContext.Provider>
    )
}

export default ProductPageTemplate;