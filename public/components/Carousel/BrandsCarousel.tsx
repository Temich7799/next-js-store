import Image from 'next/image';
import React, { useContext } from "react";
import styled from "styled-components";
import { CarouselOptions } from "../../types/CarouselPropsType";
import { PageContext } from "../Layouts/Layout";
import Carousel from "./Carousel";

const BrandThumb = styled.div`
    width: 100px;
    height: 100px;
`;

const BrandsCarousel = (props: CarouselOptions) => {

    const { language } = useContext(PageContext);
    const { CAROUSEL_BRANDS_TITLE } = require(`../../languages/${language}/languages`);

    return (
        <Carousel title={CAROUSEL_BRANDS_TITLE} maxWidth="850px" options={props}>
            <BrandThumb>
                <Image src="/images/brands/cry_babies.jpg" alt="Cry Babies logo" width={100} height={100}/>
            </BrandThumb>
            <BrandThumb>
                <Image src="/images/brands/lol.png" alt="LOL logo" width={100} height={100}/>
            </BrandThumb>
            <BrandThumb>
                <Image src="/images/brands/manolo_dolls.png" alt="Manollo Dolls logo" width={100} height={100}/>
            </BrandThumb>
            <BrandThumb>
                <Image src="/images/brands/skip_hop.jpeg" alt="Skip Hop logo" width={100} height={100}/>
            </BrandThumb>
            <BrandThumb>
                <Image src="/images/brands/nines_d_onill.jpg" alt="Nines d'Onil" width={100} height={100}/>
            </BrandThumb>
        </Carousel>
    )
}

export default BrandsCarousel;