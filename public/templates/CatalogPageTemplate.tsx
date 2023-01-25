import React, { useContext } from "react"
import styled from "styled-components";
import CategoryThumb from "../components/Product/Thumbs/CategoryThumb";
import PageTitle from "../components/PageTitle";
import { PageContext } from "./BaseTemplate";

type CatalogPageTemplateProps = {
    data: [CatalogItem]
}

type CatalogItem = {
    image: {
        alt: string
        src: string
    }
    slug: string
    name: string
    description: string
}

const Content = styled.div`
  max-width: 1700px;
  margin: 0 auto;
  padding: 2.5%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  column-gap: 25px;
  row-gap: 50px;
`

const CatalogPageTemplate = (props: CatalogPageTemplateProps) => {

    const { language } = useContext(PageContext);
    const { CATALOG_PAGE_TITLE } = require(`../languages/${language}/languages`);

    const { data } = props;

    return (
        <>
            <PageTitle>{CATALOG_PAGE_TITLE}</PageTitle>
            <Content>
                {
                    data.map((item: CatalogItem, index: number) =>
                        <CategoryThumb data={item} key={index} />)
                }
            </Content>
        </>
    )
}

export default CatalogPageTemplate;