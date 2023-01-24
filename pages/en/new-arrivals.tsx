import React from "react"
import NewArrivalsPageContent from "../../public/components/Content/NewArrivalsPageContent";
import Layout from "../../public/components/Layouts/Layout";
import { getMenuItems } from "../../public/services/getMenuItems"

const NewArrivalsPage = (props: any) => {

    return (
        <Layout data={props.menuItemsData} language="en">
            <NewArrivalsPageContent />
        </Layout>
    )
}

export default NewArrivalsPage;

export async function getStaticProps() {

    return {
        props: {
            menuItemsData: await getMenuItems('en')
        },
    };
}