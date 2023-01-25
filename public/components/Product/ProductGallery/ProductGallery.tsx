import React, { useContext, useState } from "react"
import styled from "styled-components"
import { ProductPageContext } from "../../../templates/ProductPageTemplate";
import ProductGalleryCarousel from "./ProductGalleryCarousel";
import ProductGallerySelectedImage from "./ProductGallerySelectedImage";

type ProductGalleryProps = {
    compImages: any | undefined
}

const StyledProductGallery = styled.div`
    width: 405px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
`;

const ProductGallery = (props: ProductGalleryProps) => {

    const { images, id } = useContext(ProductPageContext);

    const { compImages } = props;

    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <StyledProductGallery>
            <ProductGallerySelectedImage selectedImage={selectedImage} />
            {
                images.length > 1 && <ProductGalleryCarousel data={images} productId={id} compImages={compImages} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
            }
        </StyledProductGallery>
    )
}

export default ProductGallery;