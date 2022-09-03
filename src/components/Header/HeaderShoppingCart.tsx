import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import styled from "styled-components"
import toogle from "../../services/toogle";
import Button from "../Button";
import ImageSVG from "../ImageSVG";
import PopUp from "../PopUp";
import OrderDetails from "../Product/ShoppingCart/OrderDetails";

const StyledHeaderShoppingCart = styled.div`
    position: relative;
`;

const PurchasesCount = styled.div`
    position: absolute;
    width: 25px;
    height: 25px;
    top: 0;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: yellow;
`;

type Product = {
    name: string
    sku: string
    price: string
    sale_price: string
    image: { src: string, alt: string },
    product_id: number
    quantity: number
}

const HeaderShoppingCart = () => {

    const [showPopUp, setShowPopUp] = useState<boolean>(false);

    const shoppingCartProducts = useSelector((state: { shoppingCart: [Product] }) => state.shoppingCart);

    const purchasesCount = Object.values(shoppingCartProducts).length;

    function buttonOnClickHandler() {
        setShowPopUp(toogle(showPopUp));
    }

    return (
        <StyledHeaderShoppingCart>
            <Button buttonSize="shrink" buttonStyle="transparent" onClick={buttonOnClickHandler}>
                <ImageSVG path="/svg/shopping_cart.svg" height="35px" width="35px" />
                <PurchasesCount>
                    <p>{purchasesCount}</p>
                </PurchasesCount>
            </Button>
            <PopUp visible={showPopUp} setVisible={setShowPopUp}><OrderDetails /></PopUp>
        </StyledHeaderShoppingCart>
    )
}

export default HeaderShoppingCart;