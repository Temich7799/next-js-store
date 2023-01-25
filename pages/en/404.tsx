import React, { useContext } from "react"
import BaseTemplate, { PageContext } from "../../public/templates/BaseTemplate"
import NotFoundPageTemplate from "../../public/templates/NotFoundPageTemplate"
import MetaData from "../../public/components/MetaData"
import { getMenuItems } from "../../public/services/getMenuItems"

const NotFoundPage = (props: any) => {
  return (
    <BaseTemplate data={props.menuItemsData} language="en">
      <NotFoundPageTemplate />
    </BaseTemplate>
  )
}

export default NotFoundPage;

export const Head = () => {

  const { language } = useContext(PageContext);
  const { PAGE_NOT_FOUND_TITLE, PAGE_NOT_FOUND_DESCRIPTION } = require(`../public/languages/${language}/languages`);

  const metaData = {
    title: PAGE_NOT_FOUND_TITLE,
    description: PAGE_NOT_FOUND_DESCRIPTION
  };

  return <MetaData data={metaData} />
}

export async function getStaticProps() {

  return {
    props: {
      menuItemsData: await getMenuItems('en')
    },
  };
}