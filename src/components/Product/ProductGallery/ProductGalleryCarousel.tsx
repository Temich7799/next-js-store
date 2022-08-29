import React from "react"
import styled from "styled-components"
import useMobile from "../../../services/hooks/useMobile";

const StyledProductGalleryCarousel = styled.div<any>`
    width: ${props => props.isMobile ? "300px" : "100px"};
    height: ${props => props.isMobile ? "100px" : "400px"};
    display: flex;
    flex-wrap: ${props => props.isMobile ? "no-wrap" : "wrap"};
    align-content: flex-start;
    gap: 5px;
    overflow-x: ${props => props.isMobile ? "scroll" : "hidden"};
    overflow-y: ${props => props.isMobile ? "hidden" : "scroll"};
    
`;

const ProductGalleryCarouselImage = styled.img<any>`
    width: 100px;
    height: 100px;
    object-fit: cover;
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

type ProductGalleryCarouselProps = {
    images: [
        {
            alt: string
            src: string
        }
    ]
    selectedImage: number
    setSelectedImage: any
}

const ProductGalleryCarousel = (props: ProductGalleryCarouselProps) => {

    const { images, setSelectedImage, selectedImage } = props;

    const isMobile = useMobile(450);

    return (
        <StyledProductGalleryCarousel isMobile={isMobile}>
            {
                images.map((img) =>
                    < ProductGalleryCarouselImage
                        isSelected={images.indexOf(img) == selectedImage && true}
                        src={img.src}
                        alt={img.alt}
                        onClick={(e: any) => setSelectedImage(images.indexOf(img))}
                    />)
            }
        </StyledProductGalleryCarousel>
    )
}

export default ProductGalleryCarousel;