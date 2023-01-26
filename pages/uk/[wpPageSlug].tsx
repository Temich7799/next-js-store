import React from "react";
import styled from "styled-components";
import { GlobalWpStyle } from "../../public/styles/GlobalWpStyle";
import BaseTemplate, { apolloClient } from "../../public/templates/BaseTemplate";
import PageTitle from '../../public/components/PageTitle';
import NotFoundPageTemplate from '../../public/templates/NotFoundPageTemplate';
import { parsePageMetaData } from "../../public/services/parsePageMetaData";
import MetaData from "../../public/components/MetaData";
import { gql } from "@apollo/client";
import { getMenuItems } from "../../public/services/getMenuItems";

const Content = styled.div`
    max-width: 1700px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    row-gap: 7.5px;
    column-gap: 50px;
    row-gap: 25px;
    padding: 2.5%;
`;

const WpPageLayout = (props: any) => {

  return (
    <BaseTemplate data={props.menuItemsData} language='uk'>
      <>
        <GlobalWpStyle />
        <PageTitle>{props.wpPageData.title.rendered}</PageTitle>
        {
          (props.wpPageData.content.rendered)
            ? <Content dangerouslySetInnerHTML={{ __html: props.wpPageData.content.rendered }} />
            : <NotFoundPageTemplate />
        }
      </>
    </BaseTemplate>
  )
}

export default WpPageLayout;

export const Head = (props: any) => {

  const { metaData, openGraphData } = parsePageMetaData(props.pageContext.pageData.yoast_head_json);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}

export async function getStaticPaths() {

  const language = 'uk';

  const { data } = await apolloClient.query({
    query: gql`
      query getAllWpPagesPaths($language: LanguagesEnum, $filter: WP_PageFilter) {
        allWpPages(language: $language, filter: $filter) {
          slug
        }
      }
    `,
    variables: {
      language: language,
      filter: {
        exclude: { slug: ["home", "catalog"] },
        include: { status: 'publish' }
      }
    }
  });

  return {
    paths: data.allWpPages.map((wpPage: any) => ({
      params: {
        wpPageSlug: wpPage.slug
      }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {

  const language = 'uk';

  const { data } = await apolloClient.query({
    query: gql`
      query getWpPageData($language: LanguagesEnum, $filter: WP_PageFilter) {
        allWpPages(language: $language, filter: $filter) {
          title {
            rendered
          }
          content {
            rendered
          }
          yoast_head_json {
            title
            description
            og_title
            og_type
            og_locale
            og_site_name
            og_description
          }
        }
      }
    `,
    variables: {
      language: language,
      filter: {
        exclude: { slug: ["home", "catalog"] },
        include: { status: 'publish', slug: params.wpPageSlug }
      }
    }
  });

  return {
    props: {
      wpPageData: data.allWpPages[0],
      menuItemsData: await getMenuItems(language)
    }
  }
}