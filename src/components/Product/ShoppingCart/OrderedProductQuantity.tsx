import React from "react"
import styled from "styled-components"
import { useDispatch } from 'react-redux'
import Button from "../../Button";
import ImageSVG from "../../ImageSVG";
import { addToShoppingCart, decreaseProductQuantity, removeFromShoopingCart, } from "../../../store/shoppingCartSlice";

const StyledOrderedProductQuantity = styled.div`
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;  
    gap: 5px;
`;

type Product = {
    data: {
        name: string
        sku: string
        price: string
        sale_price: string
        image: { src: string, alt: string }
        wordpress_id: number
        quantity: number
    }
}

const OrderedProductQuantity = (props: Product) => {

    const { data } = props;

    const dispath = useDispatch();

    return (
        <StyledOrderedProductQuantity>
            <p>x {data.quantity}</p>
            <div>
                <Button buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault();
                        dispath(addToShoppingCart(data));
                    }}>
                    <ImageSVG path='/svg/increase.svg' height="25px" width="25px" />
                </Button>
                <Button buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault();
                        dispath(decreaseProductQuantity(data.wordpress_id));
                    }}>
                    <ImageSVG path='/svg/decrease.svg' height="25px" width="25px" />
                </Button>
            </div>
            <Button buttonSize="shrink" buttonStyle="transparent"
                onClick={(e: any) => {
                    e.preventDefault();
                    dispath(removeFromShoopingCart(data.wordpress_id))
                }}>
                <ImageSVG path='/svg/clear_cart.svg' height="25px" width="25px" />
            </Button>
        </StyledOrderedProductQuantity>
    )
}

export default OrderedProductQuantity;