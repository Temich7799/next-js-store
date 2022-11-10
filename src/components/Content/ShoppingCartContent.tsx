import React from "react"
import styled from "styled-components";
import OrderDetails from "../ShoppingCart/OrderDetails/OrderDetails";
import ShoppingCartForm from "../ShoppingCart/ShoppingCartForm/ShoppingCartForm";

type ShoppingCartContentProps = {
  setters: {
    setOrderDetailsData: React.Dispatch<React.SetStateAction<object>>
    setIsOrderSending: React.Dispatch<React.SetStateAction<boolean>>
  }
  data: {
    isOrderSending: boolean
  }
}

const StyledShoppingCartContent = styled.div<any>`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-around;
`;

const ShoppingCartContent = (props: ShoppingCartContentProps) => {

  const { setOrderDetailsData, setIsOrderSending } = props.setters;
  const { isOrderSending } = props.data;

  const setters = { setOrderDetailsData: setOrderDetailsData, setIsOrderSending: setIsOrderSending };

  return (
    <StyledShoppingCartContent>
      <ShoppingCartForm setters={setters} />
      <OrderDetails isOrderSending={isOrderSending} />
    </StyledShoppingCartContent>
  )
}

export default ShoppingCartContent;