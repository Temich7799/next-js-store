import * as React from "react"
import styled from "styled-components"
import Post from "../Post";

const StyledProductReviews = styled.div`
    border: 1px solid blue;
    width: 40%;
`;

type ProductReviewsProps = {
    data: {
        date_created: string
        product_id: number
        product_name: string
        review: string
        reviewer: string
        verified: boolean
    }
}

const ProductReviews = (props: ProductReviewsProps) => {

    const { data } = props;

    return (
        <StyledProductReviews>
            <h3>Reviews</h3>
            {data &&
                <Post
                    title={data.reviewer}
                    date={data.date_created}
                    content={data.review}
                    buttonText="Answer"
                />}
        </StyledProductReviews >
    )
}

export default ProductReviews;