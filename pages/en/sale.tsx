import React from "react"
import BaseTemplate, { apolloClient } from "../../public/templates/BaseTemplate";
import { getMenuItems } from "../../public/services/getMenuItems"
import { FETCH_WC_PRODUCTS } from "../../public/apollo/gql/getAllWcProducts";
import ProductsListPageTemplate from "../../public/templates/ProductsListPageTemplate";

const SalePage = ({ pageData, menuItemsData }) => {

    return (
        <BaseTemplate data={menuItemsData} language="en">
            <ProductsListPageTemplate data={pageData} />
        </BaseTemplate>
    )
}

export default SalePage;

export async function getServerSideProps() {

    const language = 'en';

    const { data } = await apolloClient.query({
        query: FETCH_WC_PRODUCTS,
        variables: {
            language: language,
            params: {
                on_sale: true,
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