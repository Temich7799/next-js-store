import React from "react"
import styled from "styled-components"
import useMobile from "../../../services/hooks/useMobile";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

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

const ProductGalleryCarouselImage = styled.div<any>`
    width: 100px;
    height: 100px;
    //object-fit: cover;
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
    data: [
        {
            alt: string
            localFile: any
        }
    ]
    selectedImage: number
    setSelectedImage: any
}

const ProductGalleryCarousel = (props: ProductGalleryCarouselProps) => {

    const { data, setSelectedImage, selectedImage } = props;

    const isMobile = useMobile(450);

    return (
        <StyledProductGalleryCarousel isMobile={isMobile}>
            {
                data.map((image, index) =>
                    <ProductGalleryCarouselImage
                        isSelected={data.indexOf(image) == selectedImage && true}
                        onClick={() => { setSelectedImage(data.indexOf(image)) }}
                        key={index}
                    >
                        <GatsbyImage image={getImage(image.localFile)} alt={image.alt} />
                    </ProductGalleryCarouselImage>
                )
            }
        </StyledProductGalleryCarousel>
    )
}

export default ProductGalleryCarousel;