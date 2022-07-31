import * as React from "react"
import styled from "styled-components"

const StyledProductGalleryCarousel = styled.div`
    width: 100px;
    height: 400px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    row-gap: 5px;
    overflow: scroll;
`;

type ProductGalleryCarouselImageProps = {
    isSelected?: boolean
}

const ProductGalleryCarouselImage = styled.img<ProductGalleryCarouselImageProps>`
    width: 100px;
    height: 100px;
    padding-left: 5px;
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

    return (
        <StyledProductGalleryCarousel>
            {
                images.map((img) =>
                    < ProductGalleryCarouselImage
                        isSelected={images.indexOf(img) == selectedImage && true}
                        src={img.src}
                        alt={img.alt}
                        onClick={(e) => setSelectedImage(images.indexOf(img))}
                    />)
            }
        </StyledProductGalleryCarousel>
    )
}

export default ProductGalleryCarousel;