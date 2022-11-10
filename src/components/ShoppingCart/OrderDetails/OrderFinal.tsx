import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import ContinueShoppingButton from "../../Buttons/ContinueShoppingButton";
import SendOrderButton from "../../Buttons/SendOrderButton";
import GoToCartButton from "../../Buttons/GoToCartButton";
import { LangContext } from "../../Layouts/Layout";
import { ProductInCart } from "../../../interfaces/InterfaceProduct";

type OrderFinalProps = {
    data: Array<ProductInCart> | undefined
    isOrderSending?: boolean
}

const StyledOrderFinal = styled.div`
    p {
        margin: 10px 0;
        text-align: center;
        font-size: 20px;
    }
    div {  
        margin-top: 25px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap-reverse;
        gap: 15px;
    }
    h5 {
        text-align: center;
    }
`;

const OrderFinal = (props: OrderFinalProps) => {

    const { language } = useContext(LangContext);
    const { ORDER_FINAL_TITLE, CURRENCY } = require(`../../../languages/${language}/languages`);

    const { data, isOrderSending } = props;

    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        if (data) {
            setIsButtonDisabled(data.length ? false : true);
            setTotalPrice(calcTotalPrice(data));
        }
    }, [data]);

    function calcTotalPrice(products: Array<ProductInCart>): number {

        let price = 0;

        products && products.forEach((product: ProductInCart) => {
            const quantity = product.quantity ? product.quantity : 1;
            price += (parseInt(product.sale_price ? product.sale_price : product.price)) * quantity;
        });

        return price;
    }

    return (
        <StyledOrderFinal>
            <h5>{ORDER_FINAL_TITLE}:</h5>
            <p>{totalPrice} {CURRENCY}</p>
            <div>
                <ContinueShoppingButton />
                {
                    isOrderSending === false || isOrderSending === true
                        ? <SendOrderButton isButtonDisabled={isButtonDisabled} isOrderSending={isOrderSending} />
                        : <GoToCartButton isButtonDisabled={isButtonDisabled} />
                }
            </div>
        </StyledOrderFinal>
    )
}

export default OrderFinal;