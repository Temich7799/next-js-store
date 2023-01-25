import React, { useContext } from "react"
import ContinueShoppingButton from "../components/Buttons/ContinueShoppingButton";
import InfoLayout from "../components/Layouts/InfoLayout";
import { PageContext } from "./BaseTemplate";

const NotFoundPageTemplate = () => {

    const { language } = useContext(PageContext);
    const { GO_BACK_BUTTON, PAGE_NOT_FOUND_DESCRIPTION, PAGE_NOT_FOUND_TITLE } = require(`../languages/${language}/languages`);

    return (
        <InfoLayout title={PAGE_NOT_FOUND_TITLE} description={PAGE_NOT_FOUND_DESCRIPTION} imagePath={"/images/404.svg"}>
            <ContinueShoppingButton customText={GO_BACK_BUTTON} />
        </InfoLayout>
    )
}

export default NotFoundPageTemplate;