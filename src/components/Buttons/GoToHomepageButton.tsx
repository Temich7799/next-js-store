import { Link } from "gatsby";
import React from "react";
import { ORDER_FINAL_BUTTON_HOME } from "../../languages/ru/languages";
import Button from "./Button";

const GoToHomepageButton = () => {

    return (
        <Link to="/"><Button>{ORDER_FINAL_BUTTON_HOME}</Button></Link>
    )
}

export default GoToHomepageButton;