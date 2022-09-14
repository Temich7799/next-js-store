import * as React from "react"
import styled from "styled-components"

const StyledProductGallerySelectedImage = styled.img`
    width:300px;
    height: 400px;
`;

type ProductGallerySelectedImageProps = {
    data: [
        {
            alt: string
            src: string
        }
    ]
    selectedImage: number
}

const ProductGallerySelectedImage = (props: ProductGallerySelectedImageProps) => {

    const { selectedImage, data } = props;

    return (
        <StyledProductGallerySelectedImage src={data[selectedImage].src} alt={data[selectedImage].alt} />
    )
}

export default ProductGallerySelectedImage;