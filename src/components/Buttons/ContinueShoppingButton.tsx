import React from "react";
import { ORDER_FINAL_BUTTON_BACK } from "../../languages/ru/languages";
import { useLastProductPageVar } from "../../services/hooks/useLastProductPageVar";
import Button from "./Button";

const ContinueShoppingButton = () => {

    const { url: lastProductPageUrl } = useLastProductPageVar();

    function onClickHandler(onButtonClickEvent: any): void {
        onButtonClickEvent.preventDefault();
        window.document.location.href = lastProductPageUrl;
    }

    return (
        <Button onClick={(e: any) => onClickHandler(e)}>{ORDER_FINAL_BUTTON_BACK}</Button>
    )
}

export default ContinueShoppingButton;