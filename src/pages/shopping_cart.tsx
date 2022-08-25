import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components";
import Layout from "../components/Layouts/MainLayout";
import OrderDetails from "../components/Product/ShoppingCart/OrderDetails";
import ShoppingCartForm from "../components/Product/ShoppingCart/ShoppingCartForm/ShoppingCartForm";
import useWindowDimensions from "../services/hooks/useWindowDimensions";
import sendOrder from "../services/sendOrder";

const StyledShoppingCartPage = styled.div<any>`
  margin: 0 auto;
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

  const [isFetchPending, setIsFetchPending] = useState<boolean>(false);

  const form = useRef<any>();
  useEffect(() => form.current.addEventListener('submit', (e: any) => formOnSubmitHandler(e)), []);

  function formOnSubmitHandler(onSubmitEvent: any) {
    onSubmitEvent.preventDefault();
    setIsFetchPending(true);
    sendOrder(form.current)
      .then((result) => console.log(result))
      .catch((error) => console.log(error))
      .finally(() => setIsFetchPending(false))
  }

  return (
    <>
      <Layout>
        <main>
          <StyledShoppingCartPage isMobile={isMobile}>
            <ShoppingCartForm ref={form} />
            <OrderDetails ref={form} isFetchPending={isFetchPending} />
          </StyledShoppingCartPage>
        </main>
      </Layout>
    </>
  )
}

export default ShoppingCartPage;