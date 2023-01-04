import React, { useContext } from "react"
import Layout, { LangContext } from "../../public//components/Layouts/Layout"
import NotFoundPageContent from "../../public//components/Content/NotFoundPageContent"
import MetaData from "../../public//components/Layouts/MetaData"

const NotFoundPage = () => {
  return (
    <Layout language="en">
      <NotFoundPageContent />
    </Layout>
  )
}

export default NotFoundPage;

export const Head = () => {

  const { language } = useContext(LangContext);
  const { PAGE_NOT_FOUND_TITLE, PAGE_NOT_FOUND_DESCRIPTION } = require(`../../public/languages/${language}/languages`);

  const metaData = {
    title: PAGE_NOT_FOUND_TITLE,
    description: PAGE_NOT_FOUND_DESCRIPTION
  };

  return <MetaData data={metaData} />
}