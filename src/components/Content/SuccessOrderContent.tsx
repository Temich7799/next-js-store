import React, { useContext } from "react";
import ContainerCentered from "../../styles/ContainerCentered";
import ContinueShoppingButton from "../Buttons/ContinueShoppingButton";
import GoToHomepageButton from "../Buttons/GoToHomepageButton";
import InfoLayout from "../Layouts/InfoLayout";
import { LangContext } from "../Layouts/Layout";

type SuccessOrderContentProps = {
    orderId: string
};

const SuccessOrderContent = (props: SuccessOrderContentProps) => {

    const { language } = useContext(LangContext);
    const { ORDER_SUCCESS_DESCRIPTION, ORDER_SUCCESS_DETAILS, ORDER_SUCCESS_TITLE } = require(`../../languages/${language}/languages`);

    const { orderId } = props;

    return (
        <InfoLayout title={ORDER_SUCCESS_TITLE + '!'} description={ORDER_SUCCESS_DESCRIPTION} details={`${ORDER_SUCCESS_DETAILS}: ${orderId}`} imagePath="/svg/baby_ok.svg">
            <ContainerCentered direction="row">
                <ContinueShoppingButton />
                <GoToHomepageButton />
            </ContainerCentered>
        </InfoLayout>
    )
}

export default SuccessOrderContent;