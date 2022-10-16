import React from "react"
import styled from "styled-components"
import { useShoppingCartVar } from "../../../../services/hooks/apollo/useShoppingCartVar"
import { ProductInCart } from "../../../../types/InterfaceProduct"
import Button from "../../../Buttons/Button"
import ImageSVG from "../../../ImageSVG"

type PurchasedProductQuantityProps = {
    data: ProductInCart
}

const StyledPurchasedProductQuantity = styled.div`
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;  
    gap: 5px;
    p {
        min-width: 25px;
    }
`;

const PurchasedProductQuantity = (props: PurchasedProductQuantityProps) => {

    const { data } = props;

    const { add, decrease, clear, data: shoppingCartData } = useShoppingCartVar();

    return (
        <StyledPurchasedProductQuantity>
            <p>x {data.quantity ? data.quantity : shoppingCartData ? shoppingCartData[data.id].quantity : 0}</p>
            <div>
                <Button buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault();
                        add(data.id, data);
                    }}>
                    <ImageSVG path='/svg/increase.svg' height="25px" width="25px" />
                </Button>
                <Button buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault();
                        decrease(data.id);
                    }}>
                    <ImageSVG path='/svg/decrease.svg' height="25px" width="25px" />
                </Button>
            </div>
            <Button buttonSize="shrink" buttonStyle="transparent"
                onClick={(e: any) => {
                    e.preventDefault();
                    clear(data.id);
                }}>
                <ImageSVG path='/svg/clear_cart.svg' height="25px" width="25px" />
            </Button>
        </StyledPurchasedProductQuantity >
    )
}

export default PurchasedProductQuantity;