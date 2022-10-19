import React, { useContext } from "react"
import styled from "styled-components"
import { ProductPageContext } from "../../Content/ProductPageContent"

type ProductGalleryCarouselProps = {
    data?: any | undefined
    selectedImage: number
    setSelectedImage: any
}

const StyledProductGalleryCarousel = styled.div`
    width: 100px;
    height: 400px;
    overflow-x: hidden;
    overflow-y: scroll;

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

    const { images, id } = useContext(ProductPageContext);

    const { data, setSelectedImage, selectedImage } = props;

    return (
        <StyledProductGalleryCarousel>
            {
                images.map((image, index) =>
                    <ProductGalleryCarouselImage
                        isSelected={images.indexOf(image) == selectedImage && true}
                        onClick={() => { setSelectedImage(images.indexOf(image)) }}
                        key={index}
                    >
                        <img src={data && data[id].length > 1 && data[id][index] ? data[id][index] : image.src} alt={image.alt} />
                    </ProductGalleryCarouselImage>
                )
            }
        </StyledProductGalleryCarousel>
    )
}

export default ProductGalleryCarousel;