import React, { useContext } from "react";
import { useLastProductPageVar } from "../../services/hooks/apollo_vars/useLastProductPageVar";
import { LangContext } from "../Layouts/Layout";
import { PopUpWindowContext } from "../PopUp/PopUpWindow";
import Button from "./Button";

type ContinueShoppingButtonProps = {
    customText?: string
}

const ContinueShoppingButton = (props: ContinueShoppingButtonProps) => {

    const { language } = useContext(LangContext);
    const { ORDER_FINAL_BUTTON_BACK } = require(`../../languages/${language}/languages`);

    const { setVisible }: any = useContext(PopUpWindowContext);

    const { url: lastProductPageUrl } = useLastProductPageVar();

    function onClickHandler(onButtonClickEvent: any): void {

        onButtonClickEvent.preventDefault();

        if (window.document.location.href !== lastProductPageUrl) {
            window.document.location.href = lastProductPageUrl
        }
        else {
            setVisible(false);
        }
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