import * as React from "react"
import styled from "styled-components"
import Button from "../../Button";

const StyledProductBuy = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 10px 0;
`;

type ProductBuyProps = {
    price: string
}

const ProductBuy = (props: ProductBuyProps) => {

    const { price } = props;

    return (
        <StyledProductBuy>
            <p>Price: <b>{price}</b></p>
            <Button>Buy</Button>
        </StyledProductBuy>
    )
}

export default ProductBuy;