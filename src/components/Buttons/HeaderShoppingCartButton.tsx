import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useIsMenuOpenedVar } from "../../services/hooks/apollo_vars/useIsMenuOpenedVar";
import { useShoppingCartVar } from "../../services/hooks/apollo_vars/useShoppingCartVar";
import toogle from "../../services/toogle";
import Button from "./Button";
import PopUp from "../PopUp";
import OrderDetails from "../Product/ShoppingCart/OrderDetails/OrderDetails";
import { PurchasesCount } from "../../styles/PurchasesCount";
import { StaticImage } from "gatsby-plugin-image";

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
                <StaticImage src="../../images/cart/shopping_cart.svg" alt="shopping-cart-icon" width={35} height={35} layout="fixed" placeholder="blurred" />
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