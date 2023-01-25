import React, { useContext } from "react";
import ContainerCenteredWrapper from "../components/Wrappers/ContainerCenteredWrapper";
import ContinueShoppingButton from "../components/Buttons/ContinueShoppingButton";
import GoToHomepageButton from "../components/Buttons/GoToHomepageButton";
import InfoLayout from "../components/Layouts/InfoLayout";
import { PageContext } from "./BaseTemplate";

type SuccessOrderTemplateProps = {
    orderId: string
};

const SuccessOrderTemplate = (props: SuccessOrderTemplateProps) => {

    const { language } = useContext(PageContext);
    const { ORDER_SUCCESS_DESCRIPTION, ORDER_SUCCESS_DETAILS, ORDER_SUCCESS_TITLE } = require(`../languages/${language}/languages`);

    const { orderId } = props;

    return (
        <InfoLayout title={ORDER_SUCCESS_TITLE + '!'} description={ORDER_SUCCESS_DESCRIPTION} details={`${ORDER_SUCCESS_DETAILS}: ${orderId}`} imagePath="/images/baby_ok.svg">
            <ContainerCenteredWrapper direction="row">
                <ContinueShoppingButton />
                <GoToHomepageButton />
            </ContainerCenteredWrapper>
        </InfoLayout>
    )
}

export default SuccessOrderTemplate;