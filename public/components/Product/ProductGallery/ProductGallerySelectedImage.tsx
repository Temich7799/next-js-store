import React, { useContext } from "react"
import styled from "styled-components"
import { ProductPageContext } from "../../../templates/ProductPageTemplate";
import { PageContext } from "../../../templates/BaseTemplate";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'

type ProductGallerySelectedImageProps = {
    selectedImage: number
}

const StyledProductGallerySelectedImage = styled.div`
    width:300px;
    height: 400px;
`;

const ProductGallerySelectedImage = (props: ProductGallerySelectedImageProps) => {

    //const { language } = useContext(PageContext);
    //const { NO_PRODUCT_IMAGE } = require(`../../../languages/${language}/languages`);

    const { images }: any = useContext(ProductPageContext);

    const { selectedImage } = props;

    const imageSource = images.length > 0 ? images[selectedImage].src : 'https://admin.malinikids.com/wp-content/uploads/woocommerce-placeholder.png';
    //const imageAlt = images.length > 0 ? images[selectedImage].alt : NO_PRODUCT_IMAGE;

    return (
        <StyledProductGallerySelectedImage>
            <InnerImageZoom src={imageSource} zoomType={'hover'} width={300} height={400} />
        </StyledProductGallerySelectedImage>
    )
}

export default ProductGallerySelectedImage;