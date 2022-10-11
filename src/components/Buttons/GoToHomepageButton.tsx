import { Link } from "gatsby";
import React, { useContext } from "react";
import { LangContext } from "../Layouts/Layout";
import Button from "./Button";

const GoToHomepageButton = () => {

    const language = useContext(LangContext);
    const { ORDER_FINAL_BUTTON_HOME } = require(`../../languages/${language}/languages`);

    return (
        <Link to="/"><Button>{ORDER_FINAL_BUTTON_HOME}</Button></Link>
    )
}

export default GoToHomepageButton;