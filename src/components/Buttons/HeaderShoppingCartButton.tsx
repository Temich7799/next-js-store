import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useIsMenuOpenedVar } from "../../services/hooks/apollo_vars/useIsMenuOpenedVar";
import { useShoppingCartVar } from "../../services/hooks/apollo_vars/useShoppingCartVar";
import toogle from "../../services/toogle";
import Button from "./Button";
import PopUpWindow from "../PopUpWindow";
import OrderDetails from "../Product/ShoppingCart/OrderDetails/OrderDetails";
import { PurchasesCount } from "../../styles/PurchasesCount";
import { StaticImage } from "gatsby-plugin-image";

const StyledHeaderShoppingCartButton = styled.div`
    position: relative;
`;

const HeaderShoppingCartButton = () => {

    const [showPopUpWindow, setShowPopUpWindow] = useState<boolean>(false);

    const { isMenuOpenedVar } = useIsMenuOpenedVar();

    const { data } = useShoppingCartVar();
    const purchasesCount = data ? Object.values(data).length : '0';

    useEffect(() => {
        isMenuOpenedVar === true && setShowPopUpWindow(false);
    }, [isMenuOpenedVar]);

    function buttonOnClickHandler() {
        setShowPopUpWindow(toogle(showPopUpWindow));
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
        </StyledHeaderShoppingCartButton>
    )
}

export default HeaderShoppingCartButton;