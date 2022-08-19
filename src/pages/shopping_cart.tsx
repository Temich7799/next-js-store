import React, { useEffect, useState } from "react"
import styled from "styled-components";
import Layout from "../components/Layouts/MainLayout";
import OrderDetails from "../components/Product/ShoppingCart/OrderDetails";
import ShoppingCartForm from "../components/Product/ShoppingCart/ShoppingCartForm/ShoppingCartForm";
import useWindowDimensions from "../services/hooks/useWindowDimensions";

const StyledShoppingCartPage = styled.div<any>`
  margin-top: ${props => props.isMobile ? "164px" : "0"};
  max-width: 1900px;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-around;
  padding: 2.5% 2.5%;
`;


const ShoppingCartPage = () => {

  const { deviceHeight, deviceWidth } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => setIsMobile(deviceWidth < 820 ? true : false), [deviceWidth]);

  return (
    <>
      <Layout>
        <main>
          <StyledShoppingCartPage isMobile={isMobile}>
            <ShoppingCartForm />
            <OrderDetails />
          </StyledShoppingCartPage>
        </main>
      </Layout>
    </>
  )
}

export default ShoppingCartPage;