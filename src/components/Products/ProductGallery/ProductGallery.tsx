import React, { useState } from "react"
import styled from "styled-components"
import ProductGalleryCarousel from "./ProductGalleryCarousel";
import ProductGallerySelectedImage from "./ProductGallerySelectedImage";

const StyledProductGallery = styled.div`
    width: 405px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
`;

type ProductGalleryProps = {
    data: [
        {
            alt: string
            src: string
            localFile: object
        }
    ]
}

const ProductGallery = (props: ProductGalleryProps) => {

    const { data } = props;

    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <StyledProductGallery>
            <ProductGallerySelectedImage data={data} selectedImage={selectedImage} />
            <ProductGalleryCarousel data={data} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        </StyledProductGallery>
    )
}

export default ProductGallery;