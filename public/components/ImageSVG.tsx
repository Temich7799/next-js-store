import * as React from "react"
import styled from "styled-components"

type ImageSVGProps = {
    path: string
    height: string
    width?: string
}

const StyledImageSVG = styled.div<ImageSVGProps>`
    height: ${props => props.height};
    width:  ${props => props.width};
    background-image: url(${props => props.path});
    background-size: 100% 100%;
`;

const ImageSVG = (props: ImageSVGProps) => {

    const { path, height, width } = props;

    return (
        <StyledImageSVG path={path} height={height} width={width} />
    )
}
export default ImageSVG
