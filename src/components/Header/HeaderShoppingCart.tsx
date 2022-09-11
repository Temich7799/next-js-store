import React, { useState } from "react"
import styled from "styled-components"
import toogle from "../../services/toogle";
import Button from "../Button";
import ImageSVG from "../ImageSVG";
import PopUp from "../PopUp";
import OrderDetails from "../Products/ShoppingCart/OrderDetails/OrderDetails";
import { useReactiveVar } from "@apollo/client";
import { shoppingCartVar } from "../../graphql/vars/shoppingCartVar";

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

const HeaderShoppingCart = () => {

    const [showPopUp, setShowPopUp] = useState<boolean>(false);

    const purchasesCount = Object.values(useReactiveVar(shoppingCartVar)).length;

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