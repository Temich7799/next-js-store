import * as React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { graphql } from "gatsby";

const Layout = ({ data }: any) => {
  console.log(data);
  return (
    <>
      <Header />
      {(data.wpPage.content) ? <main dangerouslySetInnerHTML={{ __html: data.wpPage.content }} /> : '404'}
      <Footer />
    </>
  )
}

export default Layout

export const query = graphql`
query ($slug: String!) {
    wpPage(slug: {eq: $slug}) {
      content
      title
    }
  } 
`


