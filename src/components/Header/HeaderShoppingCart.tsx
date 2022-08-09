import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Button from "../Button";
import ImageSVG from "../ImageSVG";

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

    const [purchasesCount, setPurchasesCount] = useState<string>("0");

    useEffect(() => {
        setPurchasesCount(calcPurchasesCount());
        function onClickHandler(target: any) { target.closest('#shoppingCartButton') && setPurchasesCount(calcPurchasesCount()) }
        window.addEventListener('click', (e: MouseEvent) => onClickHandler(e.target))
    }, []);

    function calcPurchasesCount(): string {
        let purchasesCount = 0;
        const getProducts = localStorage.getItem('ordered_products');
        getProducts && JSON.parse(getProducts).forEach(() => purchasesCount++);
        return purchasesCount.toString();
    }

    return (
        <StyledHeaderShoppingCart>
            <Button buttonSize="shrink" buttonStyle="transparent">
                <ImageSVG path="/svg/shopping_cart.svg" height="35px" width="35px" />
                <PurchasesCount>
                    <p>{purchasesCount}</p>
                </PurchasesCount>
            </Button>
        </StyledHeaderShoppingCart>
    )
}

export default HeaderShoppingCart;