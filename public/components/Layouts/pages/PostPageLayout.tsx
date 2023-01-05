import React from "react";
import Layout from "../Layout";
import PageTitle from "../../PageTitle";
import styled from "styled-components";
import NotFoundPageContent from "../../Content/NotFoundPageContent";
import MetaData from "../MetaData";
import { parsePageMetaData } from "../../../services/parsePageMetaData";
import { GlobalWpStyle } from "../../../styles/GlobalWpStyle";

type PostPageLayoutProps = {
  pageContext: {
    pageData: PostPageData
    language: string
  }
}

type PostPageData = {
  content: {
    rendered: string
  }
  title: {
    rendered: string
  }
}

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

const PostPageLayout = (props: PostPageLayoutProps) => {

  const { pageData, language } = props.pageContext;

  return (
    <Layout language={language}>
      <>
        <GlobalWpStyle />
        <PageTitle>{pageData.title.rendered}</PageTitle>
        {
          (pageData.content.rendered)
            ? <Content dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
            : <NotFoundPageContent />
        }
      </>
    </Layout>
  )
}

export default PostPageLayout;

export const Head = (props: any) => {

  const { metaData, openGraphData } = parsePageMetaData(props.pageContext.pageData.yoast_head_json);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}


