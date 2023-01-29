import React from "react"
import BaseTemplate, { apolloClient } from "../../public/templates/BaseTemplate";
import { getMenuItems } from "../../public/services/getMenuItems"
import { FETCH_WC_PRODUCTS } from "../../public/apollo/gql/getAllWcProducts";
import ProductsListPageTemplate from "../../public/templates/ProductsListPageTemplate";
import MetaData from "../../public/components/MetaData";

const SalePage = ({ pageData, menuItemsData }) => {

    const language = 'en';

    const { SALE_PAGE_META_TITLE } = require(`../../public/languages/${language}/languages`);

    const metaData = {
        title: SALE_PAGE_META_TITLE,
        description: ''
    };

    return (
        <>
            <MetaData data={metaData} />
            <BaseTemplate data={menuItemsData} language={language}>
                <ProductsListPageTemplate data={pageData} queryParams={{ on_sale: true }} />
            </BaseTemplate>
        </>
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
            menuItemsData: await getMenuItems(language)
        },
    };
}