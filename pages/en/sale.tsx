import React from "react"
import SalePageTemplate from "../../public/templates/SalePageTemplate";
import BaseTemplate from "../../public/templates/BaseTemplate";
import { getMenuItems } from "../../public/services/getMenuItems"

const SalePage = (props: any) => {

    return (
        <BaseTemplate data={props.menuItemsData} language="en">
            <SalePageTemplate />
        </BaseTemplate>
    )
}

export default SalePage;

export async function getServerSideProps() {

    return {
        props: {
            menuItemsData: await getMenuItems('en')
        },
    };
}