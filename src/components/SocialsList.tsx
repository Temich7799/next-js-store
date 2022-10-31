import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import ImageSVG from "./ImageSVG";

const StyledSocialsList = styled.div<any>`

    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        gap: 30px;
        margin: 0;
        padding: 0;
        list-style: none;
        li {
            display: block;
        }
    }
`;

const SocialsList = () => {

    return (
        <StyledSocialsList>
            <ul>
                <li><a href="https://t.me/MaliniKids" target="_blank"><ImageSVG path="/svg/socials/telegram.svg" height="20px" width="20px" /></a></li>
                <li><a href="viber://chat?number=%2B380939734756" target="_blank"><ImageSVG path="/svg/socials/viber.svg" height="20px" width="20px" /></a></li>
                <li> <a href="https://www.instagram.com/malini.com.ua" target="_blank"><ImageSVG path="/svg/socials/instagram.svg" height="20px" width="20px" /></a></li>
            </ul>
        </StyledSocialsList>
    )
}

export default SocialsList
