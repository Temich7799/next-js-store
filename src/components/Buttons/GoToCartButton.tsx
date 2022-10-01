import { Link } from "gatsby";
import React from "react";
import { ORDER_FINAL_BUTTON_CONTINUE, ORDER_FINAL_BUTTON_DISABLED, PRODUCT_OUT_OF_STOCK_BUTTON_TITLE } from "../../languages/ru/languages";
import Button from "./Button";

type GoToCartButtonProps = {
    isButtonDisabled: boolean
    isOutOfStock?: boolean
}

const GoToCartButton = (props: GoToCartButtonProps) => {

    const { isButtonDisabled, isOutOfStock } = props;

    return (
        <>
            {
                isButtonDisabled || isOutOfStock
                    ?
                    <Button buttonStyle="accent" disabled={isButtonDisabled}>
                        {
                            isOutOfStock
                                ? PRODUCT_OUT_OF_STOCK_BUTTON_TITLE
                                : ORDER_FINAL_BUTTON_DISABLED
                        }
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