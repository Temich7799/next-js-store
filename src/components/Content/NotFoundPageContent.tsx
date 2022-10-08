import React from "react"
import { GO_BACK_BUTTON, PAGE_NOT_FOUND_DESCRIPTION, PAGE_NOT_FOUND_TITLE } from "../../languages/ru/languages";
import ContinueShoppingButton from "../Buttons/ContinueShoppingButton";
import InfoLayout from "../Layouts/InfoLayout";

const NotFoundPageContent = () => {
    return (
        <InfoLayout title={PAGE_NOT_FOUND_TITLE} description={PAGE_NOT_FOUND_DESCRIPTION} imagePath={"/svg/404.svg"}>
            <ContinueShoppingButton customText={GO_BACK_BUTTON} />
        </InfoLayout>
    )
}

export default NotFoundPageContent;