import Link from 'next/link';
import React, { useContext } from "react";
import { PageContext } from "../Layouts/Layout";
import Button from "./Button";

type GoToCartButtonProps = {
    isButtonDisabled: boolean
    isOutOfStock?: boolean
}

const GoToCartButton = (props: GoToCartButtonProps) => {

    const { language, langPrefix } = useContext(PageContext);
    const { ORDER_FINAL_BUTTON_CONTINUE, ORDER_FINAL_BUTTON_DISABLED, PRODUCT_OUT_OF_STOCK_BUTTON_TITLE } = require(`../../languages/${language}/languages`);

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
                    <Link href={`/${langPrefix}shopping-cart`}>
                        <Button buttonStyle="accent" disabled={isButtonDisabled}>
                            {ORDER_FINAL_BUTTON_CONTINUE}
                        </Button>
                    </Link>

            }
        </>
    )
}

export default GoToCartButton;