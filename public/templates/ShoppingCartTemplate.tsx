import React from "react"
import styled from "styled-components";
import OrderDetails from "../components/ShoppingCart/OrderDetails/OrderDetails";
import ShoppingCartForm from "../components/ShoppingCart/ShoppingCartForm/ShoppingCartForm";

type ShoppingCartTemplateProps = {
  setters: {
    setOrderDetailsData: React.Dispatch<React.SetStateAction<object>>
    setIsOrderSending: React.Dispatch<React.SetStateAction<boolean>>
  }
  data: {
    isOrderSending: boolean
  }
}

const StyledShoppingCartTemplate = styled.div<any>`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-around;
`;

const ShoppingCartTemplate = (props: ShoppingCartTemplateProps) => {

  const { setOrderDetailsData, setIsOrderSending } = props.setters;
  const { isOrderSending } = props.data;

  const setters = { setOrderDetailsData: setOrderDetailsData, setIsOrderSending: setIsOrderSending };

  return (
    <StyledShoppingCartTemplate>
      <ShoppingCartForm setters={setters} />
      <OrderDetails isOrderSending={isOrderSending} />
    </StyledShoppingCartTemplate>
  )
}

export default ShoppingCartTemplate;