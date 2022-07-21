import * as React from "react"
import styled from "styled-components"

const StyledProductReviews = styled.div`
    border: 1px solid blue;
    width: 40%;
`;

const ProductReviews = () => {

    return (
        <StyledProductReviews>
            <h3>Reviews</h3>
        </StyledProductReviews>
    )
}

export default ProductReviews;