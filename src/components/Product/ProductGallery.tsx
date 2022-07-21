import * as React from "react"
import styled from "styled-components"

const StyledProductGallery = styled.div`
    width: 500px;
    height: 400px;
    img {
        width: 400px;
    }
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

    return (
        <StyledProductGallery>
            <img src={data[0].src} alt={data[0].alt}></img>
        </StyledProductGallery>
    )
}

export default ProductGallery;