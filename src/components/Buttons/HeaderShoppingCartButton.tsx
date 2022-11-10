import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { useIsMenuOpenedVar } from "../../services/hooks/apollo_vars/useIsMenuOpenedVar";
import { useShoppingCartVar } from "../../services/hooks/apollo_vars/useShoppingCartVar";
import toogle from "../../services/toogle";
import Button from "./Button";
import PopUpWindow from "../PopUp/PopUpWindow";
import OrderDetails from "../ShoppingCart/OrderDetails/OrderDetails";
import { PurchasesCount } from "../../styles/PurchasesCount";
import { StaticImage } from "gatsby-plugin-image";
import PopUpToaster from "../PopUp/PopUpToaster";
import toast from 'react-hot-toast';
import { LangContext } from "../Layouts/Layout";

const StyledHeaderShoppingCartButton = styled.div`
    position: relative;
`;

const HeaderShoppingCartButton = () => {

    const { language } = useContext(LangContext);
    const { ORDER_FINAL_BUTTON_DISABLED } = require(`../../languages/${language}/languages`);

    const [showPopUpWindow, setShowPopUpWindow] = useState<boolean>(false);

    const { isMenuOpenedVar } = useIsMenuOpenedVar();

    const { data } = useShoppingCartVar();
    const purchasesCount = data ? Object.values(data).length : 0;

    useEffect(() => {
        isMenuOpenedVar === true && setShowPopUpWindow(false);
    }, [isMenuOpenedVar]);

    function buttonOnClickHandler() {
        purchasesCount > 0
            ? setShowPopUpWindow(toogle(showPopUpWindow))
            : toast(ORDER_FINAL_BUTTON_DISABLED, { duration: 1000 });
    }

    return (
        <StyledHeaderShoppingCartButton>
            <Button buttonSize="shrink" buttonStyle="transparent" onClick={buttonOnClickHandler}>
                <StaticImage src="../../images/cart/shopping_cart.svg" alt="shopping-cart-icon" width={35} height={35} layout="fixed" placeholder="blurred" />
                <PurchasesCount>
                    <p>{purchasesCount}</p>
                </PurchasesCount>
            </Button>
            <PopUpWindow visible={showPopUpWindow} setVisible={setShowPopUpWindow} >
                <OrderDetails />
            </PopUpWindow>
            <PopUpToaster />
        </StyledHeaderShoppingCartButton>
    )
}

export default HeaderShoppingCartButton;