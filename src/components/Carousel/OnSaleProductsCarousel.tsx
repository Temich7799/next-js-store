import React, { useContext } from "react";
import CarouselWithFetchedProducts from "./CarouselWithFetchedProducts";
import { LangContext } from "../Layouts/Layout";

const OnSaleProductsCarousel = () => {

    const { language } = useContext(LangContext);
    const { CAROUSEL_PRODUCTS_ON_SALE_TITLE } = require(`../../languages/${language}/languages`);

    return (
        <CarouselWithFetchedProducts title={CAROUSEL_PRODUCTS_ON_SALE_TITLE + ' 🛒'} params={{ on_sale: true }} />
    )
}

export default OnSaleProductsCarousel;