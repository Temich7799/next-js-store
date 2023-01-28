import React from "react"
import BaseTemplate, { apolloClient } from "../../public/templates/BaseTemplate";
import { getMenuItems } from "../../public/services/getMenuItems"
import getActualDate from "../../public/services/getActualDate";
import { FETCH_WC_PRODUCTS } from "../../public/apollo/gql/getAllWcProducts";
import ProductsListPageTemplate from "../../public/templates/ProductsListPageTemplate";

const NewArrivalsPage = ({ pageData, menuItemsData }) => {

    return (
        <BaseTemplate data={menuItemsData} language="en">
            <ProductsListPageTemplate data={pageData} queryParams={{ after: getActualDate() }} />
        </BaseTemplate>
    )
}

export default NewArrivalsPage;

export async function getServerSideProps() {

    const language = 'en';

    const { data } = await apolloClient.query({
        query: FETCH_WC_PRODUCTS,
        variables: {
            language: language,
            params: {
                after: getActualDate(),
                stock_status: "instock"
            }
        }
    });

    return {
        props: {
            pageData: data.allWcProducts,
            menuItemsData: await getMenuItems('en')
        },
    };
}