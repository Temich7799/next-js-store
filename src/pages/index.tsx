import * as React from "react"
import Layout from "../components/Layout"

const IndexPage = ({data}:any) => {
  return (
    <Layout>
      <main>
        {data}
      </main>
    </Layout>
  )
}

export default IndexPage
