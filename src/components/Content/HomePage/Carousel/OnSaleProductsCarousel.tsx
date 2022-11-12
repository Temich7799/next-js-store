import React, { useContext } from "react";
import CarouselWithProducts from "../../../Carousel/CarouselWithProducts";
import { LangContext } from "../../../Layouts/Layout";

const OnSaleProductsCarousel = () => {

    const { language } = useContext(LangContext);
    const { CAROUSEL_PRODUCTS_ON_SALE_TITLE } = require(`../../../languages/${language}/languages`);

    return (
        <CarouselWithProducts title={CAROUSEL_PRODUCTS_ON_SALE_TITLE + ' 🛒'} params={{ on_sale: true, per_page: 15 }} />
    )
}

export default OnSaleProductsCarousel;