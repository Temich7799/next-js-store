import React, { useState } from "react"
import styled from "styled-components";
import Layout from "../../components/Layouts/Layout";
import ShoppingCartContent from "../../components/Content/ShoppingCartContent";
import SuccessOrderContent from "../../components/Content/SuccessOrderContent";

const StyledShoppingCartPage = styled.main`
    max-width: 1700px;
    padding: 2.5% 2.5%;
`;

const ShoppingCartPage = () => {

  const [orderDetailsData, setOrderDetailsData] = useState<object | any>();
  const [isOrderSending, setIsOrderSending] = useState<boolean>(false);

  const setters = {
    setOrderDetailsData: setOrderDetailsData,
    setIsOrderSending: setIsOrderSending
  };

  const data = { isOrderSending: isOrderSending }

  return (
    <Layout language="uk">
      <StyledShoppingCartPage>
        {
          orderDetailsData
            ? <SuccessOrderContent orderId={orderDetailsData.id} />
            : <ShoppingCartContent setters={setters} data={data} />
        }
      </StyledShoppingCartPage>
    </Layout >
  )
}

export default ShoppingCartPage;