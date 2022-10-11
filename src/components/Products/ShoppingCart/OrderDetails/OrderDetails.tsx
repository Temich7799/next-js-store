import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { useShoppingCartVar } from "../../../../services/hooks/apollo/useShoppingCartVar";
import OrderFinal from "./OrderFinal";
import PurchasedProducts from "./PurchasedProducts";
import { LangContext } from "../../../Layouts/Layout";

type OrderDetailsProps = {
    isOrderSending?: boolean
}

type PurchasedProduct = {
    name: string
    slug: string
    sku: string
    price: string
    sale_price: string
    stock_quantity: number | null
    stock_status: string
    image: {
        alt: string
        src: string
    }
    images: [{
        alt: string
        localFile: any
    }]
    wordpress_id: number
    id: string
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

const OrderDetails = (props: OrderDetailsProps) => {

    const { language } = useContext(LangContext);
    const { ORDER_DETAILS_TITLE } = require(`../../../../languages/${language}/languages`);

    const { isOrderSending } = props;

    const { data } = useShoppingCartVar();

    const [shoppingCartProductsData, setShoppingCartProductsData] = useState<object | any>();
    useEffect(() => { data && setShoppingCartProductsData(Object.values(data)) }, [data]);

    return (
        <StyledOrderDetails id="order_details">
            <h4>{ORDER_DETAILS_TITLE}</h4>
            <PurchasedProducts data={shoppingCartProductsData} />
            <OrderFinal data={shoppingCartProductsData} isOrderSending={isOrderSending} />
        </StyledOrderDetails >
    )
}

export default OrderDetails;
