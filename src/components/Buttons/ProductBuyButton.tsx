import React from "react";
import { PRODUCT_BUY_BUTTON_TITLE, PRODUCT_OUT_OF_STOCK_BUTTON_TITLE } from "../../languages/ru/languages";
import ImageSVG from "../ImageSVG";
import Button from "./Button";

type ProductBuyButtonProps = {
    onClickHandler: Function
    isDataLoading: boolean
    isOutOfStock: boolean
}

const ProductBuyButton = (props: ProductBuyButtonProps) => {

    const { onClickHandler, isDataLoading, isOutOfStock } = props;

    return (
        <Button onClick={onClickHandler} disabled={isDataLoading || isOutOfStock}>
            {
                isOutOfStock
                    ? PRODUCT_OUT_OF_STOCK_BUTTON_TITLE
                    : PRODUCT_BUY_BUTTON_TITLE
            }
            <ImageSVG path="/svg/add_to_cart.svg" height="25px" width="25px" />
        </Button>
    )
}

export default ProductBuyButton;
