import React from "react"
import styled from "styled-components"

type ProductGalleryCarouselProps = {
    data: Array<any>
    productId: string
    compImages: any | object | undefined
    selectedImage: number
    setSelectedImage: any
}

const StyledProductGalleryCarousel = styled.div`
    width: 100px;
    height: 400px;
    overflow-x: hidden;
    overflow-y: scroll;
    box-shadow: -1px 4px 5px -2px rgb(0 0 0 / 25%);
    
    @media (max-width: 450px) { 
        width: 300px;
        height: 100px;
        display: -webkit-box;
        overflow-x: scroll;
        overflow-y: hidden;
    }
`;

const ProductGalleryCarouselImage = styled.div<any>`
    padding: 2.5px;
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
                filter: opacity(45%);
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

    const { data, productId, compImages, setSelectedImage, selectedImage } = props;

    return (
        <StyledProductGalleryCarousel>
            {
                data.map((image, index) =>
                    <ProductGalleryCarouselImage
                        isSelected={data.indexOf(image) == selectedImage && true}
                        onClick={() => { setSelectedImage(data.indexOf(image)) }}
                        key={index}
                    >
                        <img src={compImages && compImages[productId] && compImages[productId].length > 1 && compImages[productId][index] ? compImages[productId][index] : image.src} alt={image.alt} />
                    </ProductGalleryCarouselImage>
                )
            }
        </StyledProductGalleryCarousel>
    )
}

export default ProductGalleryCarousel;