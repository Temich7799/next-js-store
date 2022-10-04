import React from "react";
import { ORDER_SUCCESS_DESCRIPTION, ORDER_SUCCESS_DETAILS, ORDER_SUCCESS_TITLE } from "../../../languages/ru/languages";
import ContainerCentered from "../../../styles/ContainerCentered";
import ContinueShoppingButton from "../../Buttons/ContinueShoppingButton";
import GoToHomepageButton from "../../Buttons/GoToHomepageButton";
import InfoLayout from "../../Layouts/pages/InfoLayout";

type SuccessOrderContentProps = {
    orderId: string
};

const SuccessOrderContent = (props: SuccessOrderContentProps) => {

    const { orderId } = props;

    return (
        <InfoLayout title={ORDER_SUCCESS_TITLE} description={ORDER_SUCCESS_DESCRIPTION} details={`<b>${ORDER_SUCCESS_DETAILS}: </b>${orderId}`} imagePath="/svg/baby_ok.svg">
            <ContainerCentered direction="row">
                <ContinueShoppingButton />
                <GoToHomepageButton />
            </ContainerCentered>
        </InfoLayout>
    )
}

export default SuccessOrderContent;