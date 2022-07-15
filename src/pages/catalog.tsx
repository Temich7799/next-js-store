import * as React from "react"
import styled from "styled-components";
import Layout from "../components/Layout";
import CategoryThumb from "../components/Product/CategoryThumb";


const StyledCatalogPage = styled.main`
  display: flex;
  justify-content: space-around;
`

const CatalogPage = () => {
  return (
    <>
      <Layout>
        <StyledCatalogPage>
          <CategoryThumb />
          <CategoryThumb />
          <CategoryThumb />
        </StyledCatalogPage>
      </Layout>
    </>
  )
}

export default CatalogPage;