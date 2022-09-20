import { Link } from "gatsby";
import React from "react";
import { ORDER_FINAL_BUTTON_CONTINUE, ORDER_FINAL_BUTTON_DISABLED } from "../../languages/ru/languages";
import Button from "./Button";

type GoToCartButtonProps = {
    isButtonDisabled: boolean
}

const GoToCartButton = (props: GoToCartButtonProps) => {

    const { isButtonDisabled } = props;

    return (
        <>
            {
                isButtonDisabled
                    ?
                    <Button buttonStyle="accent" disabled={isButtonDisabled}>
                        {ORDER_FINAL_BUTTON_DISABLED}
                    </Button>
                    :
                    <Link to="/shopping_cart">
                        <Button buttonStyle="accent" disabled={isButtonDisabled}>
                            {ORDER_FINAL_BUTTON_CONTINUE}
                        </Button>
                    </Link>

            }
        </>
    )
}

export default GoToCartButton;