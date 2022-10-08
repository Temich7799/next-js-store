import React, { useContext, useState } from "react"
import styled from "styled-components"
import { PageContext } from "../../Content/ProductPageContent";
import ProductGalleryCarousel from "./ProductGalleryCarousel";
import ProductGallerySelectedImage from "./ProductGallerySelectedImage";

const StyledProductGallery = styled.div`
    width: 405px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
`;

type ProductGallery = [
    {
        alt: string
        src: string
        localFile?: object
    }
]

const ProductGallery = () => {

    const { images }: ProductGallery | any = useContext(PageContext);

    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <StyledProductGallery>
            <ProductGallerySelectedImage data={images} selectedImage={selectedImage} />
            <ProductGalleryCarousel data={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        </StyledProductGallery>
    )
}

export default ProductGallery;