import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }

    * {
        ::-webkit-scrollbar {
                display: none
            }
    }

    #__next {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        width: 100%;
        margin: 10px 0;
        text-align: center;
        font-family: 'Montserrat';
    }

    h2 {
        font-size: 36px;
        font-weight: 400;
    }

    h3 {
        font-size: 30px;
        line-height: 45px;
        color: #9ed6e4;
    }

    h4 {
        font-size: 24px;
        line-height: 36px;
        color: #73aadb;
    }

    a {
        color: #7b67d2;
        text-decoration: none;
        cursor: pointer;
    }

    p {
        width: 100%;
        margin: 10px 0;
        font-family: "Montserrat";
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        color: #111111;
    }
`;