import React, { useContext } from "react"
import styled from "styled-components"
import { ProductInCart } from "../../../interfaces/InterfaceProduct"
import { LangContext } from "../../Layouts/Layout"
import PurchasedProduct from "./PurchasedProduct"

type PurchasedProductsProps = {
    data: Array<ProductInCart> | undefined
}

const StyledPurchasedProducts = styled.div`
   hr {
        border:none;
        border-bottom: 1.25px dashed #d888a9;
    }
`;

const PurchasedProductsWrapper = styled.div`
    margin: 15px 0;
    min-height: 80px;
    max-height: 200px;
    width: 100%;
    overflow: scroll;
    p {
        margin: 25% 0;
        text-align: center;
    }
`;

const PurchasedProducts = (props: PurchasedProductsProps) => {

    const { language } = useContext(LangContext);
    const { ORDER_FINAL_BUTTON_DISABLED } = require(`../../../languages/${language}/languages`);

    const { data } = props;

    return (
        <StyledPurchasedProducts>
            <hr />
            <PurchasedProductsWrapper id="ordered_products">
                {
                    data && data.length > 0
                        ? data.map((product: ProductInCart) => <PurchasedProduct data={product} key={product.id} />)
                        : <p>{ORDER_FINAL_BUTTON_DISABLED}</p>
                }

            </PurchasedProductsWrapper>
            <hr />
        </StyledPurchasedProducts>
    )
}

export default PurchasedProducts;
