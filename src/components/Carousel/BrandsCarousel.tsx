import { StaticImage } from "gatsby-plugin-image";
import React, { useContext } from "react";
import styled from "styled-components";
import { CarouselOptions } from "../../types/CarouselPropsType";
import { LangContext } from "../Layouts/Layout";
import Carousel from "./Carousel";

const BrandThumb = styled.div`
    width: 100px;
    height: 100px;
`;

const BrandsCarousel = () => {

    const { language } = useContext(LangContext);
    const { CAROUSEL_BRANDS_TITLE } = require(`../../languages/${language}/languages`);

    const options: CarouselOptions = {
        maxItemsPerSlide: 3
    }

    return (
        <Carousel title={CAROUSEL_BRANDS_TITLE} maxWidth="850px" options={options}>
            <BrandThumb>
                <StaticImage src="../../images/brands/cry_babies.jpg" alt="Cry Babies logo" width={100} height={100} placeholder="blurred" layout='fixed' />
            </BrandThumb>
            <BrandThumb>
                <StaticImage src="../../images/brands/lol.png" alt="LOL logo" width={100} height={100} placeholder="blurred" layout='fixed' />
            </BrandThumb>
            <BrandThumb>
                <StaticImage src="../../images/brands/manolo_dolls.png" alt="Manollo Dolls logo" width={100} height={100} placeholder="blurred" layout='fixed' />
            </BrandThumb>
            <BrandThumb>
                <StaticImage src="../../images/brands/skip_hop.jpeg" alt="Skip Hop logo" width={100} height={100} placeholder="blurred" layout='fixed' />
            </BrandThumb>
            <BrandThumb>
                <StaticImage src="../../images/brands/nines_d_onill.jpg" alt="Nines d'Onil" width={100} height={100} placeholder="blurred" layout='fixed' />
            </BrandThumb>
        </Carousel>
    )
}

export default BrandsCarousel;