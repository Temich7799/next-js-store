import React, { useState } from "react"
import styled from "styled-components"
import ProductGalleryCarousel from "./ProductGalleryCarousel";
import ProductGallerySelectedImage from "./ProductGallerySelectedImage";

const StyledProductGallery = styled.div`
    width: 400px;
    display: flex;
    flex-wrap: wrap;
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
            <ProductGallerySelectedImage images={data} selectedImage={selectedImage} />
            <ProductGalleryCarousel images={data} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        </StyledProductGallery>
    )
}

export default ProductGallery;