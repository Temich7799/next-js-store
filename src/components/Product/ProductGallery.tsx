import React, { useState } from "react"
import styled from "styled-components"

const StyledProductGallery = styled.div`
    width: 400px;
    display: flex;
    flex-wrap: wrap;
`;

const ProductGallerySelectedImage = styled.img`
    width:300px;
    height: 400px;
`;

const ProductGalleryCarousel = styled.div`
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

type ProductGalleryProps = {
    data: [
        {
            alt: string
            src: string
        }
    ]
}

const ProductGallery = (props: ProductGalleryProps) => {

    const { data } = props;

    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <StyledProductGallery>
            <ProductGallerySelectedImage src={data[selectedImage].src} alt={data[selectedImage].alt} />
            <ProductGalleryCarousel>
                {
                    data.map((img) =>
                        < ProductGalleryCarouselImage
                            isSelected={data.indexOf(img) == selectedImage && true}
                            src={img.src}
                            alt={img.alt}
                            onClick={(e) => setSelectedImage(data.indexOf(img))}
                        />)
                }
            </ProductGalleryCarousel>
        </StyledProductGallery>
    )
}

export default ProductGallery;