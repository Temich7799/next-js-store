import React, { useContext } from "react";
import { useLastProductPageVar } from "../../services/hooks/apollo/useLastProductPageVar";
import { LangContext } from "../Layouts/Layout";
import Button from "./Button";

type ContinueShoppingButtonProps = {
    customText?: string
}

const ContinueShoppingButton = (props: ContinueShoppingButtonProps) => {

    const { language } = useContext(LangContext);
    const { ORDER_FINAL_BUTTON_BACK } = require(`../../languages/${language}/languages`);

    const { url: lastProductPageUrl } = useLastProductPageVar();

    function onClickHandler(onButtonClickEvent: any): void {
        onButtonClickEvent.preventDefault();
        window.document.location.href = lastProductPageUrl;
    }

    return (
        <Button onClick={(e: any) => onClickHandler(e)}>{
            props.customText
                ? props.customText
                : ORDER_FINAL_BUTTON_BACK
        }
        </Button>
    )
}

export default ContinueShoppingButton;