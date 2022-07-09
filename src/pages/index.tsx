import * as React from "react"
import { graphql } from "gatsby"
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const IndexPage = ({ data }: any) => {
  console.log(data.wpPage.content);
  return (
    <>
      <Header />
      <main>
        {(data.wpPage.content) ? data.wpPage.content : '404'}
      </main>
      <Footer />
    </>
  )
}

export default IndexPage

export const query = graphql`
query getHomePage {
  wpPage(slug: {eq: "home"}) {
    content
    title
  }
}

`
