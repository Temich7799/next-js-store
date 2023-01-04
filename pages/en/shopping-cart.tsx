import React, { useState } from "react"
import styled from "styled-components";
import Layout from "../src/../components/Layouts/Layout";
import ShoppingCartContent from "../src/../components/Content/ShoppingCartContent";
import SuccessOrderContent from "../src/../components/Content/SuccessOrderContent";
import MetaData from "../src/../components/Layouts/MetaData";

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
    <Layout language="en">
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

export const Head = () => {

  const language = 'en';

  const { SHOPPING_CART_PAGE_META_TITLE } = require(`../../languages/${language}/languages`);

  const metaData = {
    title: SHOPPING_CART_PAGE_META_TITLE,
    description: ''
  };

  return <MetaData data={metaData} />
}