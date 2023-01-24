import React from "react"
import SalePageContent from "../../public/components/Content/SalePageContent";
import Layout from "../../public/components/Layouts/Layout";
import { getMenuItems } from "../../public/services/getMenuItems"

const SalePage = (props: any) => {

    return (
        <Layout data={props.menuItemsData} language="en">
            <SalePageContent />
        </Layout>
    )
}

export default SalePage;

export async function getStaticProps() {

    return {
        props: {
            menuItemsData: await getMenuItems('en')
        },
    };
}