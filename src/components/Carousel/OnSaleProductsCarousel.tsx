import React, { useContext } from "react";
import CarouselWithFetchedProducts from "./CarouselWithFetchedProducts";
import { LangContext } from "../Layouts/Layout";
import { CarouselOptions } from "../../types/CarouselPropsType";

const OnSaleProductsCarousel = (props: CarouselOptions) => {

    const { language } = useContext(LangContext);
    const { CAROUSEL_PRODUCTS_ON_SALE_TITLE } = require(`../../languages/${language}/languages`);

    return (
        <CarouselWithFetchedProducts title={CAROUSEL_PRODUCTS_ON_SALE_TITLE + ' 🛒'} params={{ on_sale: true }} options={props} />
    )
}

export default OnSaleProductsCarousel;