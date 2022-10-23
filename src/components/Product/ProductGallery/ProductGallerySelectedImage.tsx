import React, { useContext } from "react"
import styled from "styled-components"
import { ProductPageContext } from "../../Content/ProductPageContent";

type ProductGallerySelectedImageProps = {
    selectedImage: number
}

const StyledProductGallerySelectedImage = styled.img`
    width:300px;
    height: 400px;
`;

const ProductGallerySelectedImage = (props: ProductGallerySelectedImageProps) => {

    const { images } = useContext(ProductPageContext);

    const { selectedImage } = props;

    return <StyledProductGallerySelectedImage src={images[selectedImage].src} alt={images[selectedImage].alt} />

}

export default ProductGallerySelectedImage;