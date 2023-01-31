import React, { useState } from "react"
import styled from "styled-components";
import OrderDetails from "../components/ShoppingCart/OrderDetails/OrderDetails";
import ShoppingCartForm from "../components/ShoppingCart/ShoppingCartForm/ShoppingCartForm";

const StyledShoppingCartTemplate = styled.div<any>`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-around;
`;

const ShoppingCartTemplate = () => {

  const [isOrderSending, setIsOrderSending] = useState<boolean>(false);

  return (
    <StyledShoppingCartTemplate>
      <ShoppingCartForm setIsOrderSending={setIsOrderSending} />
      <OrderDetails isOrderSending={isOrderSending} />
    </StyledShoppingCartTemplate>
  )
}

export default ShoppingCartTemplate;