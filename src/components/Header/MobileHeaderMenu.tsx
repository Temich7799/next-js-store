import React, { useState } from "react"
import styled, { keyframes } from "styled-components"
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import toogle from "../../services/toogle";
import Button from "../Button";
import ImageSVG from "../ImageSVG";
import SocialsList from "../SocialsList";
import MobileHeaderSubMenu from "./MobileHeaderSubMenu";

const slideFromTopAnimation = keyframes`
    from {top: -322px}
    to {top: 124px}
`;

const StyledMobileHeaderMenu = styled.div`
    position: fixed;
    top: 124px;
    width: 100%;
    flex-direction: column;
    animation: ${slideFromTopAnimation} 500ms;
`;

const MobileHeaderMenuItems = styled.nav`
    width: 100%;
    height: 300px;
    padding: 25px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #f7dcf4;
    overflow: hidden;
`;

const MobileHeaderMenuLinksWrapper = styled.div`
    max-height: 100%;
    overflow: scroll;
`;

const MobileHeaderMenuLinks = styled.ul`
    min-width: 124px;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    justify-content: center;
    list-style: none;
`;

const StyledSocials = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(248,229,255);
`;

type MobileHeaderMenuItem = {
    label: string
    url: string
    parentId: number
    childItems: {
        nodes: [
            {
                url: string
                label: string
            }
        ]
    }
}

type MobileHeaderMenuProps = {
    data: [MobileHeaderMenuItem]
}

const MobileHeaderMenu = (props: MobileHeaderMenuProps) => {

    const { data } = props;

    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
    const [showSubMenu, setShowSubMenu] = useState<boolean>(false);

    function buttonOnClickHandler(): void {
        setShowMobileMenu(toogle(showMobileMenu));
    }

    function aOnClickHandler(): void {
        setShowSubMenu(toogle(showSubMenu));
    }

    return (
        <>
            <Button buttonStyle="transparent" buttonSize="shrink" onClick={buttonOnClickHandler}>
                <ImageSVG path="/svg/shopping_cart.svg" height="50px" width="50px" />
            </Button>
            <StaticImage src="../../images/logo.png" alt="Logo" placeholder="blurred" layout="fixed" width={100} height={100} />
            {
                showMobileMenu &&
                <StyledMobileHeaderMenu>

                    <MobileHeaderMenuItems>
                        <MobileHeaderMenuLinksWrapper>
                            <MobileHeaderMenuLinks>
                                {
                                    data.map((link: MobileHeaderMenuItem) =>
                                        <>
                                            {
                                                link.childItems.nodes.length
                                                    ?
                                                    <li>
                                                        <a onClick={aOnClickHandler}>{link.label}</a>
                                                        {showSubMenu && <MobileHeaderSubMenu data={link} />}
                                                    </li>
                                                    : !link.parentId && <li><Link to={link.url}>{link.label}</Link></li>
                                            }
                                        </>)
                                }
                            </MobileHeaderMenuLinks>
                        </MobileHeaderMenuLinksWrapper>
                    </MobileHeaderMenuItems>

                    <StyledSocials>
                        <SocialsList />
                    </StyledSocials>

                </StyledMobileHeaderMenu >
            }
        </>
    )
}

export default MobileHeaderMenu;