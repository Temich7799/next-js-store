import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { useShoppingCartVar } from "../../../services/hooks/apollo_vars/useShoppingCartVar";
import OrderFinal from "./OrderFinal";
import PurchasedProducts from "./PurchasedProducts";
import { LangContext } from "../../Layouts/Layout";
import { ProductInCart } from "../../../interfaces/InterfaceProduct";

type OrderDetailsProps = {
    isOrderSending?: boolean
}

const StyledOrderDetails = styled.form`
    /* other form styles are in <src/styles/wp.css> */
    width: 90vw;
    padding: 25px 10px;
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
        margin: 5px;
    }
`;

const OrderDetails = (props: OrderDetailsProps) => {

    const { language } = useContext(LangContext);
    const { ORDER_DETAILS_TITLE } = require(`../../../languages/${language}/languages`);

    const { isOrderSending } = props;

    const { data } = useShoppingCartVar();

    const [shoppingCartProductsData, setShoppingCartProductsData] = useState<Array<ProductInCart> | undefined>();
    useEffect(() => {
        if (data) {
            const inCartProducts: Array<ProductInCart> = Object.values(data)
            setShoppingCartProductsData(inCartProducts)
        }
    }, [data]);

    return (
        <StyledOrderDetails id="order_details">
            <h4>{ORDER_DETAILS_TITLE}</h4>
            <PurchasedProducts data={shoppingCartProductsData} />
            <OrderFinal data={shoppingCartProductsData} isOrderSending={isOrderSending} />
        </StyledOrderDetails >
    )
}

export default OrderDetails;
