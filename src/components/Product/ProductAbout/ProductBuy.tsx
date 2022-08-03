import * as React from "react"
import styled from "styled-components"
import { addToCart } from "../../../services/addToCart";
import Button from "../../Button";
import ImageSVG from "../../ImageSVG";
import ProductPrice from "../ProductPrice";

const StyledProductBuy = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 10px 0;
`;

type ProductBuyProps = {
    price: string
    salePrice: string
    productId: number
}

const ProductBuy = (props: ProductBuyProps) => {

    const { price, salePrice, productId } = props;

    return (
        <StyledProductBuy>
            <ProductPrice price={price} salePrice={salePrice} />
            <Button onClick={() => addToCart(productId)}>
                <>
                    Buy
                    <ImageSVG path="/svg/add_to_cart.svg" height="25px" width="25px" />
                </>
            </Button>
        </StyledProductBuy >
    )
}

export default ProductBuy;