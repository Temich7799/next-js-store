import React, { useContext } from "react"
import Layout, { PageContext } from "../../public/components/Layouts/Layout"
import NotFoundPageContent from "../../public/components/Content/NotFoundPageContent"
import MetaData from "../../public/components/Layouts/MetaData"
import { getMenuItems } from "../../public/services/getMenuItems"

const NotFoundPage = (props: any) => {
  return (
    <Layout data={props.menuItemsData} language="uk">
      <NotFoundPageContent />
    </Layout>
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
      menuItemsData: await getMenuItems('uk')
    },
  };
}