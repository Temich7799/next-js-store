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

const ProductGallery = () => {

    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <StyledProductGallery>
            <ProductGallerySelectedImage selectedImage={selectedImage} />
            <ProductGalleryCarousel selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        </StyledProductGallery>
    )
}

export default ProductGallery;