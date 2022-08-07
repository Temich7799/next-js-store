import * as React from "react"
import styled from "styled-components";
import Layout from "../components/Layouts/MainLayout";
import OrderDetails from "../components/Product/ShoppingCart/OrderDetails";
import ShoppingCartForm from "../components/Product/ShoppingCart/ShoppingCartForm";

const StyledShoppingCartPage = styled.main`
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  padding: 2.5% 2.5%;
`;


const ShoppingCartPage = () => {

  return (
    <>
      <Layout>
        <StyledShoppingCartPage>
          <ShoppingCartForm />
          <OrderDetails />
        </StyledShoppingCartPage>
      </Layout>
    </>
  )
}

export default ShoppingCartPage;