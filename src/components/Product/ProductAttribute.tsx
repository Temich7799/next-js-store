import * as React from "react"
import styled from "styled-components"

type ProductAttributeProps = {
    svgPath: string
    height: string
    width?: string
}

const StyledProductAttribute = styled.div<ProductAttributeProps>`
    height: ${props => props.height};
    width:  ${props => props.width};
    background-image: url(${props => props.svgPath});
    background-size: 100% 100%;
`;

const ProductAttribute = (props: ProductAttributeProps) => {

    const { svgPath, height, width } = props;

    return (
        <StyledProductAttribute svgPath={svgPath} height={height} width={width} />
    )
}
export default ProductAttribute
