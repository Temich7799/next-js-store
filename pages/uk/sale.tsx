import React from "react"
import SalePageTemplate from "../../public/templates/SalePageTemplate";
import BaseTemplate from "../../public/templates/BaseTemplate";
import { getMenuItems } from "../../public/services/getMenuItems"

const SalePage = ({ menuItemsData }) => {

    return (
        <BaseTemplate data={menuItemsData} language="uk">
            <SalePageTemplate />
        </BaseTemplate>
    )
}

export default SalePage;

export async function getServerSideProps() {

    return {
        props: {
            menuItemsData: await getMenuItems('uk')
        },
    };
}