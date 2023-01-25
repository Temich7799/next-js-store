import Image from 'next/image';
import React, { useContext } from "react"
import styled, { keyframes } from "styled-components";
import { PageContext } from "../templates/BaseTemplate";
import { useRouter } from 'next/router'

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

const LanguageSelector = () => {

    const router = useRouter();
    console.log(router);
    const languages = ['RU', 'UA', 'EN'];
    const { language, langPrefix } = useContext(PageContext);
    const selectedLanguage = language.toLocaleUpperCase();

    function onClickHandler(language: string) {

        if (language === 'UA') language = 'UK';

        const origin = document.location.origin;
        const newPrefix = language === 'RU' ? '' : `/${language}`.toLowerCase();
        const search = document.location.search;

        const clearPath = router.asPath.split(langPrefix);
        const newPath = langPrefix !== '' && clearPath.length > 1 ? '/' + clearPath[1] : clearPath.length === 1 ? '' : router.asPath;

        document.location = origin + newPrefix + newPath + search;
    }

    return (
        <StyledLanguageSelector minDesktopWidth={process.env.NEXT_PUBLIC_MIN_DESKTOP_WIDTH}>
            <Image src="/images/language.svg" alt="decrease-quantity-icon" width={25} height={25} />
            <LanguagesList minDesktopWidth={process.env.NEXT_PUBLIC_MIN_DESKTOP_WIDTH}>
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