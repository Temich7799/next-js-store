import { StaticImage } from "gatsby-plugin-image"
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
            <BannerSlide><StaticImage src='../../images/banners/slide-1.webp' alt="Slide-1" placeholder="blurred" layout="constrained" /></BannerSlide>
            <BannerSlide><StaticImage src='../../images/banners/slide-2.webp' alt="Slide-2" placeholder="blurred" layout="constrained" /></BannerSlide>
            <BannerSlide><StaticImage src='../../images/banners/slide-3.webp' alt="Slide-3" placeholder="blurred" layout="constrained" /></BannerSlide>
            <BannerSlide><StaticImage src='../../images/banners/slide-4.webp' alt="Slide-4" placeholder="blurred" layout="constrained" /></BannerSlide>
        </Carousel>
    )
}

export default BannerHomePage;