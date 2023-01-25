import React, { useState } from "react"
import styled from "styled-components";
import BaseTemplate from "../../public/templates/BaseTemplate";
import ShoppingCartTemplate from "../../public/templates/ShoppingCartTemplate";
import SuccessOrderTemplate from "../../public/templates/SuccessOrderTemplate";
import MetaData from "../../public/components/MetaData";
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
    <BaseTemplate data={props.menuItemsData} language='uk'>
      <StyledShoppingCartPage>
        {
          orderDetailsData
            ? <SuccessOrderTemplate orderId={orderDetailsData.id} />
            : <ShoppingCartTemplate setters={setters} data={data} />
        }
      </StyledShoppingCartPage>
    </BaseTemplate >
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