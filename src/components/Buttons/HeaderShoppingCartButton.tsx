import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useIsMenuOpenedVar } from "../../services/hooks/apollo/useIsMenuOpenedVar";
import { useShoppingCartVar } from "../../services/hooks/apollo/useShoppingCartVar";
import toogle from "../../services/toogle";
import Button from "./Button";
import ImageSVG from "../ImageSVG";
import PopUp from "../PopUp";
import OrderDetails from "../Product/ShoppingCart/OrderDetails/OrderDetails";
import { PurchasesCount } from "../../styles/PurchasesCount";

const StyledHeaderShoppingCartButton = styled.div`
    position: relative;
`;

const HeaderShoppingCartButton = () => {

    const [showPopUp, setShowPopUp] = useState<boolean>(false);

    const { isMenuOpenedVar } = useIsMenuOpenedVar();

    const { data } = useShoppingCartVar();
    const purchasesCount = data ? Object.values(data).length : '0';

    useEffect(() => {
        isMenuOpenedVar === true && setShowPopUp(false);
    }, [isMenuOpenedVar]);

    function buttonOnClickHandler() {
        setShowPopUp(toogle(showPopUp));
    }

    return (
        <StyledHeaderShoppingCartButton>
            <Button buttonSize="shrink" buttonStyle="transparent" onClick={buttonOnClickHandler}>
                <ImageSVG path="/svg/cart/shopping_cart.svg" height="35px" width="35px" />
                <PurchasesCount>
                    <p>{purchasesCount}</p>
                </PurchasesCount>
            </Button>
            <PopUp visible={showPopUp} setVisible={setShowPopUp} >
                <OrderDetails />
            </PopUp>
        </StyledHeaderShoppingCartButton>
    )
}

export default HeaderShoppingCartButton;