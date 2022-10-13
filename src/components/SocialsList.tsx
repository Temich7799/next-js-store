import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import ImageSVG from "./ImageSVG";

type SocialsListProps = {
    hideOnMobile?: boolean
    hideOnDesktop?: boolean
}

const StyledSocialsList = styled.div<any>`

    @media (max-width: ${props => props.minDesktopWidth}px) {
        width: 100%;
        height: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgb(248, 229, 255);
    }


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

    @media (max-width: ${props => props.minDesktopWidth}px) {
        display: ${props => props.hideOnMobile === true && 'none'}
    }
    @media (min-width: ${props => props.minDesktopWidth}px) {
        display: ${props => props.hideOnDesktop === true && 'none'}
    }
`;

const SocialsList = (props: SocialsListProps) => {

    const { hideOnMobile, hideOnDesktop } = props;

    return (
        <StyledSocialsList hideOnMobile={hideOnMobile} hideOnDesktop={hideOnDesktop} minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
            <ul>
                <li><Link to="/facebook"><ImageSVG path="/svg/facebook.svg" height="20px" width="20px" /></Link></li>
                <li> <Link to="/instagram"><ImageSVG path="/svg/instagram.svg" height="20px" width="20px" /></Link></li>
            </ul>
        </StyledSocialsList>
    )
}

export default SocialsList
