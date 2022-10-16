import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ProductInCart } from "../../../../types/InterfaceProduct"
import { LangContext } from "../../../Layouts/Layout"
import PurchasedProduct from "./PurchasedProduct"

type PurchasedProductsProps = {
    data: Array<ProductInCart> | undefined
}

const StyledPurchasedProducts = styled.div`
    max-height: 200px;
    width: 100%;
    overflow: scroll;
`;

const PurchasedProducts = (props: PurchasedProductsProps) => {

    const { language } = useContext(LangContext);
    const { ORDER_FINAL_BUTTON_DISABLED } = require(`../../../../languages/${language}/languages`);

    const { data } = props;

    return (
        <StyledPurchasedProducts id="ordered_products">
            <hr />
            {
                data
                    ? data.map((product: ProductInCart) => <PurchasedProduct data={product} key={product.id} />)
                    : <p>{ORDER_FINAL_BUTTON_DISABLED}</p>
            }
            <hr />
        </StyledPurchasedProducts>
    )
}

export default PurchasedProducts;
