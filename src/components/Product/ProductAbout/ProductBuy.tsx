import * as React from "react"
import styled from "styled-components"
import { addToCart } from "../../../services/addToCart";
import Button from "../../Button";

const StyledProductBuy = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 10px 0;
`;

type ProductBuyProps = {
    price: string
    productId: number
}

const ProductBuy = (props: ProductBuyProps) => {

    const { price, productId } = props;

    return (
        <StyledProductBuy>
            <p>Price: <b>{price}</b></p>
            <Button onClick={() => addToCart(productId)}>Buy</Button>
        </StyledProductBuy >
    )
}

export default ProductBuy;