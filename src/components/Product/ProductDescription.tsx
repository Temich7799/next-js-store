import * as React from "react"
import styled from "styled-components"
import NotCopyArea from "../NotCopyArea";

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
            <NotCopyArea>
                <h3>Description</h3>
                <p dangerouslySetInnerHTML={{ __html: data }} />
            </NotCopyArea>
        </StyledProductDescription>
    )
}

export default ProductDescription;