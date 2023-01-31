import React from "react";
import ContainerCenteredWrapper from "../../../../public/components/Wrappers/ContainerCenteredWrapper";
import ContinueShoppingButton from "../../../../public/components/Buttons/ContinueShoppingButton";
import GoToHomepageButton from "../../../../public/components/Buttons/GoToHomepageButton";
import BaseTemplate, { apolloClient } from "../../../../public/templates/BaseTemplate";
import InfoLayout from "../../../../public/components/InfoLayout";
import MetaData from "../../../../public/components/MetaData";
import { gql } from "@apollo/client";
import { getMenuItems } from "../../../../public/services/getMenuItems";

const SuccessOrderTemplate = ({ orderData, menuItemsData }) => {

    const language = 'uk';
    const { ORDER_SUCCESS_DESCRIPTION, ORDER_SUCCESS_DETAILS, ORDER_SUCCESS_TITLE } = require(`../../../../public/languages/${language}/languages`);

    const { id: orderId } = orderData;

    const metaData = {
        title: ORDER_SUCCESS_TITLE,
        description: ''
    };

    return (
        <>
            <MetaData data={metaData} />
            <BaseTemplate data={menuItemsData} language={language}>
                <InfoLayout title={ORDER_SUCCESS_TITLE + '!'} description={ORDER_SUCCESS_DESCRIPTION} details={`${ORDER_SUCCESS_DETAILS}: ${orderId}`} imagePath="/images/baby_ok.svg">
                    <ContainerCenteredWrapper direction="row">
                        <ContinueShoppingButton />
                        <GoToHomepageButton />
                    </ContainerCenteredWrapper>
                </InfoLayout>
            </BaseTemplate>
        </>
    )
}

export default SuccessOrderTemplate;

export async function getServerSideProps({ params }) {

    const language = 'uk';

    const { data } = await apolloClient.query({
        query: gql`
            query getOrderData($productId: Int!) {
                wpWcOrder(productId: $productId) {
                    id
                }
            }
        `,
        variables: {
            productId: parseInt(params.orderId)
        }
    });

    return {
        props: {
            orderData: data.wpWcOrder,
            menuItemsData: await getMenuItems(language)
        },
    };
}