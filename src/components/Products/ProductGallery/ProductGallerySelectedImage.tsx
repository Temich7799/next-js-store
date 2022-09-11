import * as React from "react"
import ReactImageMagnify from "react-image-magnify";
import styled from "styled-components"

const StyledProductGallerySelectedImage = styled.div`
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
        <StyledProductGallerySelectedImage>
            <ReactImageMagnify {...{
                smallImage: {
                    alt: data[selectedImage].alt,
                    src: data[selectedImage].src,
                    isFluidWidth: true,
                    width: 200,
                    height: 200
                },
                largeImage: {
                    src: data[selectedImage].src,
                    alt: data[selectedImage].alt,
                    width: 900,
                    height: 1200
                },
                enlargedImagePosition: 'over',
                hoverDelayInMs: 50
            }} />
        </StyledProductGallerySelectedImage>
    )
}

export default ProductGallerySelectedImage;