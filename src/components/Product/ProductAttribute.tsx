import * as React from "react"
import styled from "styled-components"

type ProductAttributeProps = {
    svgPath: string
}

const StyledProductAttribute = styled.div<ProductAttributeProps>`
    height: 25px;
    width: 45px;
    background-image: url(${props => props.svgPath});
    background-size: 100% 100%;
`;

const ProductAttribute = (props: ProductAttributeProps) => {

    const { svgPath } = props;

    return (
        <StyledProductAttribute svgPath={svgPath} />
    )
}
export default ProductAttribute
