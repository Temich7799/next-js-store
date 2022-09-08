import React from "react"
import styled from "styled-components"
import { addToCartResolver, decreasePurchasedProductQuantityResolver, deletePurchasedProductResolver } from "../../../../graphql/vars/shoppingCartVar"
import Button from "../../../Button"
import ImageSVG from "../../../ImageSVG"

type PurchasedProduct = {
    name: string
    slug: string
    sku: string
    price: string
    sale_price: string
    images: [{
        alt: string
        localFile: any
    }]
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

    return (
        <StyledPurchasedProductQuantity>
            <p>x {data.quantity}</p>
            <div>
                <Button buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault();
                        addToCartResolver(data.wordpress_id, data);
                    }}>
                    <ImageSVG path='/svg/increase.svg' height="25px" width="25px" />
                </Button>
                <Button buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault();
                        decreasePurchasedProductQuantityResolver(data.wordpress_id);
                    }}>
                    <ImageSVG path='/svg/decrease.svg' height="25px" width="25px" />
                </Button>
            </div>
            <Button buttonSize="shrink" buttonStyle="transparent"
                onClick={(e: any) => {
                    e.preventDefault();
                    deletePurchasedProductResolver(data.wordpress_id);
                }}>
                <ImageSVG path='/svg/clear_cart.svg' height="25px" width="25px" />
            </Button>
        </StyledPurchasedProductQuantity >
    )
}

export default PurchasedProductQuantity;