import * as React from "react"
import ReactImageMagnify from "react-image-magnify";
import styled from "styled-components"

const StyledProductGallerySelectedImage = styled.div`
    width:300px;
    height: 400px;
`;

type ProductGallerySelectedImageProps = {
    images: [
        {
            alt: string
            src: string
        }
    ]
    selectedImage: number
}

const ProductGallerySelectedImage = (props: ProductGallerySelectedImageProps) => {

    const { selectedImage, images } = props;

    return (
        <StyledProductGallerySelectedImage>
            <ReactImageMagnify {...{
                smallImage: {
                    alt: images[selectedImage].alt,
                    src: images[selectedImage].src,
                    isFluidWidth: true,
                    width: 200,
                    height: 200
                },
                largeImage: {
                    src: images[selectedImage].src,
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