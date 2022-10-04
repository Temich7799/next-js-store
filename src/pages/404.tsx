import * as React from "react"
import ContinueShoppingButton from "../components/Buttons/ContinueShoppingButton"
import Layout from "../components/Layouts/Layout"
import InfoLayout from "../components/Layouts/pages/InfoLayout"
import { GO_BACK_BUTTON, PAGE_NOT_FOUND_DESCRIPTION, PAGE_NOT_FOUND_TITLE } from "../languages/ru/languages"

const NotFoundPage = () => {
  return (
    <Layout>
      <main>
        <InfoLayout title={PAGE_NOT_FOUND_TITLE} description={PAGE_NOT_FOUND_DESCRIPTION} imagePath={"/svg/404.svg"}>
          <ContinueShoppingButton customText={GO_BACK_BUTTON} />
        </InfoLayout>
      </main>
    </Layout>
  )
}

export default NotFoundPage;