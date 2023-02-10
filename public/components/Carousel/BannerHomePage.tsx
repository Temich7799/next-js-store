import Image from 'next/image';
import React from "react"
import styled from "styled-components"
import useMobile from '../../services/hooks/useMobile';
import { BannerFolderContent } from '../../types/BannerFolderContentType';
import { CarouselOptions } from "../../types/CarouselPropsType"
import Carousel from "./Carousel"

type BannerHomePageProps = {
    content: BannerFolderContent
}

const BannerSlide = styled.div`
    width: 100vw;
    max-height: 65vh;
`

const BannerHomePage = (props: BannerHomePageProps) => {

    const isMobile = useMobile(768);

    const { desktop, mobile } = props.content;

    const images = isMobile ? mobile : desktop;

    const width = isMobile ? 922 : 1920;
    const height = isMobile ? 692 : 729;

    const options: CarouselOptions = {
        mode: 'fullSize',
        autoScroll: true
    }

    const imageStyle: any = {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: '25% 25%',
    }

    return (
        <Carousel options={options}>
            {
                images.map((imageSrc, index: number) =>
                    imageSrc !== '/images/banners/mobile' && < BannerSlide key={index} > <Image src={imageSrc} alt={`Slide-${index}`} width={width} height={height} style={imageStyle} /></BannerSlide>)
            }
        </Carousel >
    )
}

export default BannerHomePage;