import React from "react"
import NewArrivalsPageTemplate from "../public/templates/NewArrivalsPageTemplate";
import BaseTemplate from "../public/templates/BaseTemplate";
import { getMenuItems } from "../public/services/getMenuItems"

const NewArrivalsPage = ({ menuItemsData }) => {

    return (
        <BaseTemplate data={menuItemsData} language="ru">
            <NewArrivalsPageTemplate />
        </BaseTemplate>
    )
}

export default NewArrivalsPage;

export async function getServerSideProps() {

    return {
        props: {
            menuItemsData: await getMenuItems('ru')
        },
    };
}