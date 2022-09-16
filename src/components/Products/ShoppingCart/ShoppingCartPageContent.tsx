import React, { useEffect, useRef } from "react"
import styled from "styled-components";
import { useShoppingCartVar } from "../../../services/hooks/useShoppingCartVar";
import { useOrder } from "../../../services/hooks/useOrder";
import OrderDetails from "./OrderDetails/OrderDetails";
import ShoppingCartForm from "./ShoppingCartForm/ShoppingCartForm";

const StyledShoppingCartPageContent = styled.div<any>`
  margin: 0 auto;
  max-width: 1700px;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-around;
  padding: 2.5% 2.5%;

  @media (max-width: 820px) {
    margin-top: 164px
  }
`;

const ShoppingCartPageContent = () => {

    const form = useRef<any>();

    const { data: orderedProducts }: any = useShoppingCartVar();
    const { data: orderData, sendOrder } = useOrder();

    useEffect(() => {
        form.current.addEventListener('submit', (e: any) => formOnSubmitHandler(e))
    }, []);

    function formOnSubmitHandler(onSubmitEvent: any) {
        onSubmitEvent.preventDefault();
        //setIsOrderFetching(true);
        sendOrder(form.current, orderedProducts)
    }

    return (
        <StyledShoppingCartPageContent>
            <ShoppingCartForm ref={form} />
            <OrderDetails ref={form} isOrderFetching={isOrderFetching} />
        </StyledShoppingCartPageContent>
    )
}

export default ShoppingCartPageContent;