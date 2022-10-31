import React from "react";
import Layout from "../Layout";
import { graphql } from "gatsby";
import PageTitle from "../../PageTitle";
import styled from "styled-components";
import NotFoundPageContent from "../../Content/NotFoundPageContent";
require('../../../styles/wp.css');

type PostPageLayoutProps = {
  pageContext: {
    data: PostPageData,
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
    padding: 2.5%;
`;

const PostPageLayout = (props: PostPageLayoutProps) => {

  const { data, language } = props.pageContext;

  return (
    <Layout language={language}>
      <>
        <PageTitle>{data.title.rendered}</PageTitle>
        {
          (data.content.rendered)
            ? <Content dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
            : <NotFoundPageContent />
        }
      </>
    </Layout>
  )
}

export default PostPageLayout;


