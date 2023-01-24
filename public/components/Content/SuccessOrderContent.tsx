import React, { useContext } from "react";
import ContainerCenteredWrapper from "../Wrappers/ContainerCenteredWrapper";
import ContinueShoppingButton from "../Buttons/ContinueShoppingButton";
import GoToHomepageButton from "../Buttons/GoToHomepageButton";
import InfoLayout from "../Layouts/InfoLayout";
import { PageContext } from "../Layouts/Layout";

type SuccessOrderContentProps = {
    orderId: string
};

const SuccessOrderContent = (props: SuccessOrderContentProps) => {

    const { language } = useContext(PageContext);
    const { ORDER_SUCCESS_DESCRIPTION, ORDER_SUCCESS_DETAILS, ORDER_SUCCESS_TITLE } = require(`../../languages/${language}/languages`);

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

export default SuccessOrderContent;