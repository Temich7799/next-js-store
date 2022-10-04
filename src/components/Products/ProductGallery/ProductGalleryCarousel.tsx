import React from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

type ProductGalleryCarouselProps = {
    data: [
        {
            alt: string
            src: string
            localFile?: any
        }
    ]
    selectedImage: number
    setSelectedImage: any
}

const StyledProductGalleryCarousel = styled.div<any>`
    width: 100px;
    height: 400px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 5px;
    overflow-x: hidden;
    overflow-y: scroll;
    @media (max-width: 450px) { 
        width: 300px;
        height: 100px;
        flex-wrap: no-wrap;
        overflow-x: scroll;
        overflow-y: hidden;
    }
    
`;

const ProductGalleryCarouselImage = styled.div<any>`
    width: 100px;
    height: 100px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    ${(props) => {
        switch (props.isSelected) {
            case true:
                return `
                filter: grayscale(85%);
            `;
            default:
                return `
                cursor: pointer;
            `;
        }
    }
    }
`;

const ProductGalleryCarousel = (props: ProductGalleryCarouselProps) => {

    const { data, setSelectedImage, selectedImage } = props;

    return (
        <StyledProductGalleryCarousel>
            {
                data.map((image, index) =>
                    <ProductGalleryCarouselImage
                        isSelected={data.indexOf(image) == selectedImage && true}
                        onClick={() => { setSelectedImage(data.indexOf(image)) }}
                        key={index}
                    >
                        {
                            image.localFile
                                ? <GatsbyImage image={getImage(image.localFile)} alt={image.alt} />
                                : <img src={image.src} alt={image.alt} />
                        }
                    </ProductGalleryCarouselImage>
                )
            }
        </StyledProductGalleryCarousel>
    )
}

export default ProductGalleryCarousel;