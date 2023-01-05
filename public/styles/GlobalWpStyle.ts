import { createGlobalStyle } from "styled-components";

export const GlobalWpStyle = createGlobalStyle`
    .has-text-align-right {
        text-align: right;
    }

    .has-text-align-center {
        text-align: center;
    }

    .has-text-align-left {
        text-align: left;
    }

    .is-vertically-aligned-bottom {
        vertical-align: bottom;
    }

    .is-vertically-aligned-middle {
        vertical-align: middle;
    }

    .is-vertically-aligned-top {
        vertical-align: top;
    }

    p.has-medium-font-size {
        font-size: 18px;
    }

    p.has-large-font-size {
        font-size: 24px;
    }

    p.has-x-large-font-size {
        font-size: 30px;
    }

    .wp-block-buttons {
        display: flex;
    }

    .wp-block-button {
        display: flex;
        align-items: center;
        width: 200px;
        height: 50px;
        color: white;
        background-color: #9ed6e4;
        cursor: pointer;
    }

    button {
        font-family: 'Noto Serif';
        font-size: 24px;
        width: 200px;
        height: 50px;
        border: none;
        color: white;
        background-color: #9ed6e4;
        cursor: pointer;
    }

    @media (hover: hover) and (pointer: fine) {
        button:hover {
            box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.5);
        }

        .wp-block-button:hover {
            box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.5);
        }
    }

    .wp-block-button__link {
        font-family: 'Noto Serif';
        font-size: 24px;
        width: 100%;
        text-align: center;
        color: black;
    }

    .is-content-justification-left {
        margin-right: auto;
    }

    .is-content-justification-right {
        margin-left: auto;
    }

    .is-content-justification-center {
        margin: 0 auto;
    }

    .wp-block-columns {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 50px;
        align-items: center;
        margin: 0 auto;
    }

    .wp-container-1 {
        width: fit-content;
    }

    .wp-block-gallery {
        width: 90%;
        width: 100%;
        display: flex;
        gap: 25px;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .about-us-video {
        max-height: 375px;
        width: 100%;
    }

    .wp-block-gallery img,
    figure {
        margin: 0;
        width: 225px;
        height: 100%;
        overflow: hidden;
    }

    .blocks-gallery-caption {
        width: 100%;
        text-align: center;
        font-family: 'Noto Serif';
        font-weight: 700;
        font-size: 25px;
    }

    @media (hover: hover) and (pointer: fine) {
        .wp-block-image img:hover {
            transition: 250ms;
            transform: scale(1.5);
            cursor: pointer;
        }
    }


    form {
        font-family: "Noto Serif";
        max-width: 430px;
        padding: 15px;
        background-color: rgb(230, 230, 230);
    }

    form label {
        font-size: 24px;
        line-height: 27px;
        color: #111111;
    }

    form input {
        width: 100%;
        height: 40px;
        border: none;
        margin: 5px 0;
    }

    form textarea {
        width: 100%;
        height: 80px;
        margin-bottom: 10px;
        border: none;
    }
`;