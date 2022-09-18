import React from "react"
import styled from "styled-components";
import OrderDetails from "./OrderDetails/OrderDetails";
import ShoppingCartForm from "./ShoppingCartForm/ShoppingCartForm";

type ShoppingCartPageContentProps = {
  setters: {
    setOrderDetailsData: React.Dispatch<React.SetStateAction<object>>
    setIsOrderSending: React.Dispatch<React.SetStateAction<boolean>>
  }
  data: {
    isOrderSending: boolean
  }
}

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

const ShoppingCartPageContent = (props: ShoppingCartPageContentProps) => {

  const { setOrderDetailsData, setIsOrderSending } = props.setters;
  const { isOrderSending } = props.data;

  const setters = { setOrderDetailsData: setOrderDetailsData, setIsOrderSending: setIsOrderSending };

  return (
    <StyledShoppingCartPageContent>
      <ShoppingCartForm setters={setters} />
      <OrderDetails isOrderSending={isOrderSending} />
    </StyledShoppingCartPageContent>
  )
}

export default ShoppingCartPageContent;