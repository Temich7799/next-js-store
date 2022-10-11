import React from "react"
import Layout from "../../components/Layouts/Layout"
import NotFoundPageContent from "../../components/Content/NotFoundPageContent"

const NotFoundPage = () => {
  return (
    <Layout language="uk">
      <main>
        <NotFoundPageContent />
      </main>
    </Layout>
  )
}

export default NotFoundPage;