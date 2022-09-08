import React, { forwardRef } from "react"
import styled from "styled-components"
import { useReactiveVar } from "@apollo/client";
import { shoppingCartVar } from "../../../../graphql/vars/shoppingCartVar";
import { ORDER_DETAILS_TITLE } from "../../../../languages/ru/languages";
import OrderFinal from "./OrderFinal";
import PurchasedProducts from "./PurchasedProducts";

type OrderDetailsProps = {
    isFetchPending?: boolean
}

type PurchasedProduct = {
    name: string
    slug: string
    sku: string
    price: string
    sale_price: string
    images: [{
        alt: string
        localFile: any
    }]
    wordpress_id: number
    quantity: number
}

const StyledOrderDetails = styled.form`
    /* other form styles are in <src/styles/wp.css> */
    width: 90vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    background-color: #fefefe;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    h1 {
        font-size: smaller;
    }
     h4 {
        margin: 0;
        text-align: center;
    }
`;

const OrderDetails = forwardRef((props: OrderDetailsProps, formRef: any) => {

    const { isFetchPending } = props;

    const shoppingCartProducts: Array<PurchasedProduct> = Object.values(useReactiveVar(shoppingCartVar));

    return (
        <StyledOrderDetails id="order_details">
            <h4>{ORDER_DETAILS_TITLE}</h4>
            <PurchasedProducts data={shoppingCartProducts} />
            <OrderFinal ref={formRef} data={shoppingCartProducts} isFetchPending={isFetchPending} />
        </StyledOrderDetails >
    )
})

export default OrderDetails;