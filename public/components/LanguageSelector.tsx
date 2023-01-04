import Image from 'next/image';
import React, { useContext, useEffect } from "react"
import styled, { keyframes } from "styled-components";
import ImageSVG from "./ImageSVG";
import { LangContext } from "./Layouts/Layout";

const SlideFromUpAnimation = keyframes`
    0% {top: -500px; opacity: 0}
    100% {top: 0; opacity: 1}
`;

const SlideDownAnimation = keyframes`
    0% {top: 0; opacity: 1}
    100% {top: 50px; opacity: 0; visibility: hidden}
`;

const StyledLanguageSelector = styled.div<any>`
    @media (hover: hover) and (pointer: fine) {
        @media (min-width: ${props => props.minDesktopWidth}px) {
            :hover {
                ul {
                    visibility: visible;
                    animation: ${SlideFromUpAnimation} 100ms;
                }
            }
        }
    }

    color: black;
    padding-right: 10px;
    display: flex;
    align-items: center;
    border-radius: 25px;
    gap: 15px;
`;

const LanguagesList = styled.ul<any>`

    @media (max-width: ${props => props.minDesktopWidth}px) {
        visibility: visible;
        flex-direction: row;
    }

    @media (min-width: ${props => props.minDesktopWidth}px) {
        visibility: hidden;
        /*animation: ${SlideDownAnimation} 100ms forwards;*/
    }
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    gap: 8px;
`;

const Language = styled.li<any>`

    color: #73aadb;
    list-style: none;

    ${props => props.selected && `
        color: #d888a9;
        text-decoration: underline;
        order: -1;
    `};
    
    @media (hover: hover) and (pointer: fine) {
        :hover {
            cursor: pointer
        }
    }
`;

const LanguageSelector = (props: any) => {

    const languages = ['RU', 'UA', 'EN'];
    const { language, langPrefix } = useContext(LangContext);
    const selectedLanguage = language.toLocaleUpperCase();

    function onClickHandler(language: string) {

        const origin = document.location.origin;

        language = language === 'UA' ? 'UK' : language;

        let newPrefix = language === 'RU' ? '' : `/${language}`.toLowerCase();

        const search = document.location.search;

        const path = langPrefix !== '' ? '/' + document.location.pathname.split(langPrefix)[1] : document.location.pathname;

        document.location = origin + newPrefix + path + search;
    }

    return (
        <StyledLanguageSelector minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
            <Image src="../images/language.svg" alt="decrease-quantity-icon" width={25} height={25} layout="fixed" />
            <LanguagesList minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
                {
                    languages.map((language: string, index: number) =>
                        language === selectedLanguage
                            ? <Language selected key={index}> {selectedLanguage}</Language>
                            : <Language onClick={() => onClickHandler(language)} key={index}> {language}</Language>
                    )
                }
            </LanguagesList>
        </StyledLanguageSelector >
    )
}

export default LanguageSelector;