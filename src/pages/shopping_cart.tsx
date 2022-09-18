import React, { useState } from "react"
import { useEffect } from "react";
import Layout from "../components/Layouts/MainLayout";
import ShoppingCartPageContent from "../components/Products/ShoppingCart/ShoppingCartPageContent";

const ShoppingCartPage = () => {

  const [orderDetailsData, setOrderDetailsData] = useState<object>();
  const [isOrderSending, setIsOrderSending] = useState<boolean>(false);

  const setters = {
    setOrderDetailsData: setOrderDetailsData,
    setIsOrderSending: setIsOrderSending
  };

  const data = { isOrderSending: isOrderSending }

  useEffect(() => { console.log(orderDetailsData) }, [orderDetailsData]);

  return (
    <Layout>
      <main>
        {
          orderDetailsData
            ? <></>
            : <ShoppingCartPageContent setters={setters} data={data} />
        }
      </main>
    </Layout >
  )
}

export default ShoppingCartPage;