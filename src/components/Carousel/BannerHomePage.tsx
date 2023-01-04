import Image from 'next/image';
import React from "react"
import styled from "styled-components"
import { CarouselOptions } from "../../types/CarouselPropsType"
import Carousel from "./Carousel"

const BannerSlide = styled.div`
    width: 100vw;
    max-height: 65vh;
`

const BannerHomePage = () => {

    const options: CarouselOptions = {
        mode: 'fullSize'
    }

    return (
        <Carousel options={options}>
            <BannerSlide><Image src='../../images/banners/slide-1.webp' alt="Slide-1" placeholder="blur" layout="constrained"  /></BannerSlide>
            <BannerSlide><Image src='../../images/banners/slide-4.webp' alt="Slide-2" placeholder="blur" layout="constrained" /></BannerSlide>
        </Carousel>
    )
}

export default BannerHomePage;