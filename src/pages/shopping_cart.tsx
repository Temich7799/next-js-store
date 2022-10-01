import { HeadProps } from "gatsby";
import React, { useState } from "react"
import styled from "styled-components";
import Layout from "../components/Layouts/MainLayout";
import MetaData from "../components/Layouts/MetaData";
import ShoppingCartContent from "../components/Products/ShoppingCart/ShoppingCartContent";
import SuccessOrderContent from "../components/Products/ShoppingCart/SuccessOrderContent";

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
    <Layout>
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

export const Head = (props: HeadProps) => {

  const metaData = {
    title: 'title',
    description: 'description'
  };

  const linkedData = {
    context: 'context',
    type: 'type',
    name: 'name'
  };

  return <MetaData data={metaData} linkedData={linkedData} />
}