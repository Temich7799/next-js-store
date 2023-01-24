import React, { useContext } from "react";
import CarouselWithFetchedProducts from "./CarouselWithFetchedProducts";
import { PageContext } from "../Layouts/Layout";
import { CarouselOptions } from "../../types/CarouselPropsType";

const OnSaleProductsCarousel = (props: CarouselOptions) => {

    const { language } = useContext(PageContext);
    const { CAROUSEL_PRODUCTS_ON_SALE_TITLE } = require(`../../languages/${language}/languages`);

    return (
        <CarouselWithFetchedProducts title={CAROUSEL_PRODUCTS_ON_SALE_TITLE + ' 🛒'} params={{ on_sale: true }} options={props} />
    )
}

export default OnSaleProductsCarousel;