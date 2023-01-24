import React, { useState } from "react"
import styled from "styled-components";
import Layout from "../../public/components/Layouts/Layout";
import ShoppingCartContent from "../../public/components/Content/ShoppingCartContent";
import SuccessOrderContent from "../../public/components/Content/SuccessOrderContent";
import MetaData from "../../public/components/Layouts/MetaData";
import { getMenuItems } from "../../public/services/getMenuItems"

const StyledShoppingCartPage = styled.main`
    max-width: 1700px;
    padding: 2.5% 2.5%;
`;

const ShoppingCartPage = (props: any) => {

  const [orderDetailsData, setOrderDetailsData] = useState<object | any>();
  const [isOrderSending, setIsOrderSending] = useState<boolean>(false);

  const setters = {
    setOrderDetailsData: setOrderDetailsData,
    setIsOrderSending: setIsOrderSending
  };

  const data = { isOrderSending: isOrderSending }

  return (
    <Layout data={props.menuItemsData} language='uk'>
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

  const language = 'uk';

  const { SHOPPING_CART_PAGE_META_TITLE } = require(`../public/languages/${language}/languages`);

  const metaData = {
    title: SHOPPING_CART_PAGE_META_TITLE,
    description: ''
  };

  return <MetaData data={metaData} />
}

export async function getStaticProps() {

  return {
    props: {
      menuItemsData: await getMenuItems('uk')
    },
  };
}