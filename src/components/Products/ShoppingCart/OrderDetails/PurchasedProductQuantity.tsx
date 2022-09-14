import React from "react"
import styled from "styled-components"
import { useShoppingCartVar } from "../../../../services/hooks/useShoppingCartVar"
import Button from "../../../Button"
import ImageSVG from "../../../ImageSVG"

type PurchasedProduct = {
    name: string
    slug: string
    sku: string
    price: string
    stock_quantity: number | null
    stock_status: string
    sale_price: string
    image: {
        alt: string
        src: string
    }
    wordpress_id: number
    quantity: number
}

type PurchasedProductQuantityProps = {
    data: PurchasedProduct
}

const StyledPurchasedProductQuantity = styled.div`
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;  
    gap: 5px;
`;

const PurchasedProductQuantity = (props: PurchasedProductQuantityProps) => {

    const { data } = props;

    const { add, decrease, clear } = useShoppingCartVar();

    return (
        <StyledPurchasedProductQuantity>
            <p>x {data.quantity}</p>
            <div>
                <Button buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault();
                        add(data.wordpress_id, data);
                    }}>
                    <ImageSVG path='/svg/increase.svg' height="25px" width="25px" />
                </Button>
                <Button buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault();
                        decrease(data.wordpress_id);
                    }}>
                    <ImageSVG path='/svg/decrease.svg' height="25px" width="25px" />
                </Button>
            </div>
            <Button buttonSize="shrink" buttonStyle="transparent"
                onClick={(e: any) => {
                    e.preventDefault();
                    clear(data.wordpress_id);
                }}>
                <ImageSVG path='/svg/clear_cart.svg' height="25px" width="25px" />
            </Button>
        </StyledPurchasedProductQuantity >
    )
}

export default PurchasedProductQuantity;