import { Link } from "gatsby";
import React from "react";
import { ORDER_FINAL_BUTTON_BACK, ORDER_FINAL_BUTTON_HOME, ORDER_SUCCESS_DESCRIPTION, ORDER_SUCCESS_DETAILS, ORDER_SUCCESS_TITLE } from "../../../languages/ru/languages";
import ContainerCentered from "../../../styles/ContainerCentered";
import Button from "../../Button";
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
                <Button>{ORDER_FINAL_BUTTON_BACK}</Button>
                <Link to="/"><Button>{ORDER_FINAL_BUTTON_HOME}</Button></Link>
            </ContainerCentered>
        </ContainerCentered>
    )
}

export default SuccessOrderContent;