import React, { useContext } from "react";
import { PageContext } from "../../templates/BaseTemplate";
import LoadingSpinner from "../LoadingBars/LoadingSpinner";
import Button from "./Button";

type SendOrderButtonProps = {
    isButtonDisabled: boolean
    isOrderSending?: boolean
}

const SendOrderButton = (props: SendOrderButtonProps) => {

    const { language } = useContext(PageContext);
    const { ORDER_FINAL_BUTTON_DISABLED, ORDER_FINAL_BUTTON_SUBMIT } = require(`../../languages/${language}/languages`);

    const { isButtonDisabled, isOrderSending } = props;

    return (
        <Button
            type="submit"
            form="order_form"
            disabled={isButtonDisabled || isOrderSending}
            buttonStyle="accent">
            {
                !isOrderSending
                    ? isButtonDisabled
                        ? ORDER_FINAL_BUTTON_DISABLED
                        : ORDER_FINAL_BUTTON_SUBMIT
                    : <LoadingSpinner size="15px"/>
            }
        </Button>
    )
}

export default SendOrderButton;