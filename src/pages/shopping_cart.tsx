import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components";
import Layout from "../components/Layouts/MainLayout";
import OrderDetails from "../components/Products/ShoppingCart/OrderDetails/OrderDetails";
import ShoppingCartForm from "../components/Products/ShoppingCart/ShoppingCartForm/ShoppingCartForm";
import useMobile from "../services/hooks/useMobile";
import sendOrder from "../services/sendOrder";

const StyledShoppingCartPage = styled.div<any>`
  margin: 0 auto;
  margin-top: ${props => props.isMobile ? "164px" : "0"};
  max-width: 1700px;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-around;
  padding: 2.5% 2.5%;
`;

const ShoppingCartPage = () => {

  const isMobile = useMobile();

  const [isOrderFetching, setIsOrderFetching] = useState<boolean>(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState<any>();

  const form = useRef<any>();
  useEffect(() => form.current.addEventListener('submit', (e: any) => formOnSubmitHandler(e)), []);

  function formOnSubmitHandler(onSubmitEvent: any) {
    onSubmitEvent.preventDefault();
    setIsOrderFetching(true);
    sendOrder(form.current)
      .then((response) => {
        setIsOrderSuccess(true);
        setOrderDetails(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsOrderFetching(false))
  }

  return (
    <Layout>
      <main>
        <StyledShoppingCartPage isMobile={isMobile}>
          {
            isOrderSuccess
              ?
              <>
                <p>The order has been sent!</p>
              </>
              :
              <>
                <ShoppingCartForm ref={form} />
                <OrderDetails ref={form} isOrderFetching={isOrderFetching} />
              </>
          }
        </StyledShoppingCartPage>
      </main>
    </Layout >
  )
}

export default ShoppingCartPage;