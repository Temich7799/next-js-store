import React from "react"
import NewArrivalsPageTemplate from "../../public/templates/NewArrivalsPageTemplate";
import BaseTemplate from "../../public/templates/BaseTemplate";
import { getMenuItems } from "../../public/services/getMenuItems"

const NewArrivalsPage = (props: any) => {

    return (
        <BaseTemplate data={props.menuItemsData} language="uk">
            <NewArrivalsPageTemplate />
        </BaseTemplate>
    )
}

export default NewArrivalsPage;

export async function getStaticProps() {

    return {
        props: {
            menuItemsData: await getMenuItems('uk')
        },
    };
}