import React, { useContext } from "react"
import styled from "styled-components"
import { ProductPageContext } from "../../Content/ProductPageContent";
import { LangContext } from "../../Layouts/Layout";

type ProductGallerySelectedImageProps = {
    selectedImage: number
}

const StyledProductGallerySelectedImage = styled.img`
    width:300px;
    height: 400px;
`;

const ProductGallerySelectedImage = (props: ProductGallerySelectedImageProps) => {

    const { language } = useContext(LangContext);
    const { NO_PRODUCT_IMAGE } = require(`../../../languages/${language}/languages`);

    const { images } = useContext(ProductPageContext);

    const { selectedImage } = props;

    const imageSource = images.length > 0 ? images[selectedImage].src : 'https://admin.malinikids.com/wp-content/uploads/woocommerce-placeholder.png';
    const imageAlt = images.length > 0 ? images[selectedImage].alt : NO_PRODUCT_IMAGE;

    return <StyledProductGallerySelectedImage src={imageSource} alt={imageAlt} />

}

export default ProductGallerySelectedImage;