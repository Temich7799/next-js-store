import React from "react"
import Layout from "../../components/Layouts/Layout";
import { graphql } from "gatsby"
import IndexPageContent from "../../components/Content/IndexPageContent";

const IndexPage = () => {

  return (
    <Layout language="en">
      <IndexPageContent />
    </Layout>
  )
}

export default IndexPage;