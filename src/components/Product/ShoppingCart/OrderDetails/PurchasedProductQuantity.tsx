import React from "react"
import styled from "styled-components"
import { useShoppingCartVar } from "../../../../services/hooks/apollo/useShoppingCartVar"
import { ProductInCart } from "../../../../interfaces/InterfaceProduct"
import Button from "../../../Buttons/Button"
import ImageSVG from "../../../ImageSVG"
import { StaticImage } from "gatsby-plugin-image"

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
                    }}
                    disabled={shoppingCartData[data.id] && shoppingCartData[data.id].quantity === data.stock_quantity}
                >
                    <ImageSVG path='/svg/cart/increase.svg' height="25px" width="25px" />
                </Button>
                <Button buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault();
                        decrease(data.id);
                    }}
                    disabled={shoppingCartData[data.id] && shoppingCartData[data.id].quantity === 1}
                >
                    <ImageSVG path='/svg/cart/decrease.svg' height="25px" width="25px" />
                </Button>
            </div>
            <Button buttonSize="shrink" buttonStyle="transparent"
                onClick={(e: any) => {
                    e.preventDefault();
                    clear(data.id);
                }}
            >
                <StaticImage src="../../../../images/cart/clear_cart.svg" alt="clear-cart-icon" width={25} height={25} layout="fixed" placeholder="blurred" />
            </Button>
        </StyledPurchasedProductQuantity >
    )
}

export default PurchasedProductQuantity;