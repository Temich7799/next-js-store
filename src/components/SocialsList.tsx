import React from "react"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image";

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
                <li><a href="https://t.me/MaliniKids" target="_blank"><StaticImage src="../images/socials/telegram.svg" alt="telegram-icon" width={20} height={17} layout="fixed" placeholder="blurred" /></a></li>
                <li><a href="viber://chat?number=%2B380939734756" target="_blank"><StaticImage src="../images/socials/viber.svg" alt="viber-icon" width={20} height={23} layout="fixed" placeholder="blurred" /></a></li>
                <li><a href="https://www.instagram.com/malini.com.ua" target="_blank"><StaticImage src="../images/socials/instagram.svg" alt="instagram-icon" width={20} height={20} layout="fixed" placeholder="blurred" /></a></li>
            </ul>
        </StyledSocialsList>
    )
}

export default SocialsList
