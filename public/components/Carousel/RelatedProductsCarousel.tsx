import React, { useContext } from "react";
import { ProductGatsby } from "../../interfaces/InterfaceProduct";
import { CarouselOptions } from "../../types/CarouselPropsType";
import { LangContext } from "../Layouts/Layout";
import CarouselWithFetchedProducts from "./CarouselWithFetchedProducts";

type RelatedProductsCarouselProps = {
    data: ProductGatsby
    compImages?: any | undefined
    options?: CarouselOptions
}

const RelatedProductsCarousel = (props: RelatedProductsCarouselProps) => {

    const { language } = useContext(LangContext);
    const { CAROUSEL_RELATED_PRODUCTS_TITLE } = require(`../../languages/${language}/languages`);

    const { data, compImages, options } = props;

    return (
        <>
            {
                data && data.related_ids.length > 0 &&
                <CarouselWithFetchedProducts
                    title={CAROUSEL_RELATED_PRODUCTS_TITLE}
                    params={{ include: data && data.related_ids }}
                    compImages={compImages}
                    options={options}
                />
            }
        </>
    )
}

export default RelatedProductsCarousel;