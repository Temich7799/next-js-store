import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import ImageSVG from "./ImageSVG";

const StyledSocialsList = styled.ul`
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
`;

const SocialsList = () => {
    return (
        <StyledSocialsList>
            <li><Link to="/facebook"><ImageSVG path="/svg/facebook.svg" height="20px" width="20px" /></Link></li>
            <li> <Link to="/instagram"><ImageSVG path="/svg/instagram.svg" height="20px" width="20px" /></Link></li>
        </StyledSocialsList>
    )
}

export default SocialsList
