import React, { useContext } from "react"
import ContinueShoppingButton from "../Buttons/ContinueShoppingButton";
import InfoLayout from "../Layouts/InfoLayout";
import { LangContext } from "../Layouts/Layout";

const NotFoundPageContent = () => {

    const language = useContext(LangContext);
    const { GO_BACK_BUTTON, PAGE_NOT_FOUND_DESCRIPTION, PAGE_NOT_FOUND_TITLE } = require(`../../languages/${language}/languages`);

    return (
        <InfoLayout title={PAGE_NOT_FOUND_TITLE} description={PAGE_NOT_FOUND_DESCRIPTION} imagePath={"/svg/404.svg"}>
            <ContinueShoppingButton customText={GO_BACK_BUTTON} />
        </InfoLayout>
    )
}

export default NotFoundPageContent;