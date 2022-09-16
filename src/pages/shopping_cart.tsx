import React, { createContext } from "react"
import Layout from "../components/Layouts/MainLayout";
import ShoppingCartPageContent from "../components/Products/ShoppingCart/ShoppingCartPageContent";

export const OrderDetails = createContext(
  {

  }
);

const ShoppingCartPage = () => {

  return (
    <Layout>
      <main>
        <OrderDetails.Provider value={ }>
          {
            <ShoppingCartPageContent />
          }
        </OrderDetails.Provider>
      </main>
    </Layout >
  )
}

export default ShoppingCartPage;