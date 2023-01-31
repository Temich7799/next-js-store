import React from "react"
import styled from "styled-components";
import BaseTemplate from "../public/templates/BaseTemplate";
import ShoppingCartTemplate from "../public/templates/ShoppingCartTemplate";
import MetaData from "../public/components/MetaData";
import { getMenuItems } from "../public/services/getMenuItems"

const StyledShoppingCartPage = styled.main`
    max-width: 1700px;
    padding: 2.5% 2.5%;
`;

const ShoppingCartPage = ({ menuItemsData }) => {

  const language = 'ru';

  const { SHOPPING_CART_PAGE_META_TITLE } = require(`../public/languages/${language}/languages`);

  const metaData = {
    title: SHOPPING_CART_PAGE_META_TITLE,
    description: ''
  };

  return (
    <>
      <MetaData data={metaData} />
      <BaseTemplate data={menuItemsData} language={language}>
        <StyledShoppingCartPage>
          <ShoppingCartTemplate />
        </StyledShoppingCartPage>
      </BaseTemplate >
    </>
  )
}

export default ShoppingCartPage;

export async function getStaticProps() {

  return {
    props: {
      menuItemsData: await getMenuItems('ru')
    },
  };
}