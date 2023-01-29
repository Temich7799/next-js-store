import React from "react"
import BaseTemplate from "../../public/templates/BaseTemplate"
import NotFoundPageTemplate from "../../public/templates/NotFoundPageTemplate"
import MetaData from "../../public/components/MetaData"
import { getMenuItems } from "../../public/services/getMenuItems"

const NotFoundPage = ({ menuItemsData }) => {

  const language = 'uk'
  const { PAGE_NOT_FOUND_TITLE, PAGE_NOT_FOUND_DESCRIPTION } = require(`../../public/languages/${language}/languages`);

  const metaData = {
    title: PAGE_NOT_FOUND_TITLE,
    description: PAGE_NOT_FOUND_DESCRIPTION
  };

  return (
    <>
      <MetaData data={metaData} />
      <BaseTemplate data={menuItemsData} language={language}>
        <NotFoundPageTemplate />
      </BaseTemplate>
    </>
  )
}

export default NotFoundPage;

export async function getStaticProps() {

  return {
    props: {
      menuItemsData: await getMenuItems('uk')
    },
  };
}