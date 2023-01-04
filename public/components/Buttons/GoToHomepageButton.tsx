import Link from 'next/link';
import React, { useContext } from "react";
import { LangContext } from "../Layouts/Layout";
import Button from "./Button";

const GoToHomepageButton = () => {

    const { language, langPrefix } = useContext(LangContext);
    const { ORDER_FINAL_BUTTON_HOME } = require(`../../languages/${language}/languages`);

    return (
        <Link href={`/${langPrefix}`}><Button>{ORDER_FINAL_BUTTON_HOME}</Button></Link>
    )
}

export default GoToHomepageButton;