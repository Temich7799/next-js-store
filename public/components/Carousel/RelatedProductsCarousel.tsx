import React, { useContext } from "react";
import { wpProduct } from "../../interfaces/InterfaceProduct";
import { CarouselOptions } from "../../types/CarouselPropsType";
import { PageContext } from "../../templates/BaseTemplate";
import CarouselWithFetchedProducts from "./CarouselWithFetchedProducts";

type RelatedProductsCarouselProps = {
    data: wpProduct
    compImages?: any | undefined
    options?: CarouselOptions
}

const RelatedProductsCarousel = (props: RelatedProductsCarouselProps) => {

    const { language } = useContext(PageContext);
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