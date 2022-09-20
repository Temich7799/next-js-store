import React from "react";
import { ORDER_SUCCESS_DESCRIPTION, ORDER_SUCCESS_DETAILS, ORDER_SUCCESS_TITLE } from "../../../languages/ru/languages";
import ContainerCentered from "../../../styles/ContainerCentered";
import ContinueShoppingButton from "../../Buttons/ContinueShoppingButton";
import GoToHomepageButton from "../../Buttons/GoToHomepageButton";
import ImageSVG from "../../ImageSVG";

type SuccessOrderContentProps = {
    orderId: string
};

const SuccessOrderContent = (props: SuccessOrderContentProps) => {

    const { orderId } = props;

    return (
        <ContainerCentered>
            <h3>{ORDER_SUCCESS_TITLE}</h3>
            <p><b>{ORDER_SUCCESS_DETAILS}: </b>{orderId}</p>
            <ImageSVG path="/svg/baby_ok.svg" width="50%" height="50%" />
            <p>{ORDER_SUCCESS_DESCRIPTION}</p>
            <ContainerCentered direction="row">
                <ContinueShoppingButton />
                <GoToHomepageButton />
            </ContainerCentered>
        </ContainerCentered>
    )
}

export default SuccessOrderContent;