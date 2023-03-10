import React from "react"
import BaseTemplate, { apolloClient } from "../../public/templates/BaseTemplate";
import { getMenuItems } from "../../public/services/getMenuItems"
import getActualDate from "../../public/services/getActualDate";
import { FETCH_WC_PRODUCTS } from "../../public/apollo/gql/getAllWcProducts";
import ProductsListPageTemplate from "../../public/templates/ProductsListPageTemplate";
import MetaData from "../../public/components/MetaData";

const NewArrivalsPage = ({ pageData, menuItemsData }) => {

    const language = 'uk';

    const { NEW_ARIVALS_PAGE_META_TITLE } = require(`../../public/languages/${language}/languages`);

    const metaData = {
        title: NEW_ARIVALS_PAGE_META_TITLE,
        description: ''
    };

    return (
        <>
            <MetaData data={metaData} />
            <BaseTemplate data={menuItemsData} language={language}>
                <ProductsListPageTemplate data={pageData} queryParams={{ after: getActualDate() }} />
            </BaseTemplate>
        </>
    )
}

export default NewArrivalsPage;

export async function getServerSideProps() {

    const language = 'uk';

    const { data } = await apolloClient.query({
        query: FETCH_WC_PRODUCTS,
        variables: {
            language: language,
            params: {
                after: getActualDate()
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