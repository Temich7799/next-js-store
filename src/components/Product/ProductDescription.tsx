import * as React from "react"
import styled from "styled-components"

const StyledProductDescription = styled.div`
    max-width: 55%;
`;

type ProductDescriptionProps = {
    data: string
}

const ProductDescription = (props: ProductDescriptionProps) => {

    const { data } = props;

    return (
        <StyledProductDescription>
            <h3>Description</h3>
            <div dangerouslySetInnerHTML={{ __html: data }} />
        </StyledProductDescription>
    )
}

export default ProductDescription;