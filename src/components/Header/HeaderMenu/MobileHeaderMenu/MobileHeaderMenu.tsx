import React, { useContext, useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import toogle from "../../../../services/toogle";
import Button from "../../../Buttons/Button";
import ImageSVG from "../../../ImageSVG";
import SocialsList from "../../../SocialsList";
import MobileHeaderSubMenu from "./MobileHeaderSubMenu";
import MobileHeaderSubMenuTitle from "./MobileHeaderSubMenuTitle";
import { useIsMenuOpenedVar } from "../../../../services/hooks/apollo/useIsMenuOpenedVar";
import { MenuItemType } from "../../../../types/MenuItemType";
import { LangContext } from "../../../Layouts/Layout";

type MobileHeaderMenuProps = {
    data: [MenuItemType]
}

const StyledMobileHeaderMenu = styled.div<any>`
    position: fixed;
    width: 100%;
    left: 0;
    top: ${props => props.isMenuOpened ? '124px' : '-500px'};
    flex-direction: column;
    transition: 250ms;
    z-index: 100;
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
    //::-webkit-scrollbar { display: none }
`;

const MobileHeaderMenuLinksWrapper = styled.div`
    max-height: 100%;
    width: 100%;
    overflow: scroll;
    scrollbar-width: none;
    //::-webkit-scrollbar { display: none }
`;

const MobileHeaderMenuLinks = styled.ul`
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    list-style: none;
`;

const StyledSocials = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(248, 229, 255);
`;

const MobileHeaderMenu = (props: MobileHeaderMenuProps) => {

    const { langPrefix } = useContext(LangContext);

    const { data } = props;

    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
    const [isSubMenuOpened, setIsSubMenuOpened] = useState<boolean>(false);

    const { setIsMenuOpenedVar } = useIsMenuOpenedVar();

    function buttonOnClickHandler(): void {
        setIsMenuOpened(toogle(isMenuOpened));
        setIsMenuOpenedVar(toogle(isMenuOpened));
    }

    function MobileHeaderSubMenuTitleOnClickHandler(): void {
        setIsSubMenuOpened(toogle(isSubMenuOpened));
    }

    return (
        <>
            <Button buttonStyle="transparent" buttonSize="shrink" onClick={buttonOnClickHandler}>
                <ImageSVG path={isMenuOpened ? "/svg/close.svg" : "/svg/open_mobile_menu.svg"} height="30px" width="30px" />
            </Button>
            <StaticImage src="../../../../images/logo.png" alt="Logo" placeholder="blurred" layout="fixed" width={100} height={100} />
            {
                <StyledMobileHeaderMenu isMenuOpened={isMenuOpened}>

                    <MobileHeaderMenuItems>
                        <MobileHeaderMenuLinksWrapper>
                            <MobileHeaderMenuLinks>
                                {
                                    data.map((item: MenuItemType, index: number) =>

                                        item.child_items !== null
                                            ?
                                            <MobileHeaderMenuLinks key={index}>
                                                <MobileHeaderSubMenuTitle title={item.title} isSubMenuOpened={isSubMenuOpened} onClickHandler={MobileHeaderSubMenuTitleOnClickHandler} />
                                                {
                                                    isSubMenuOpened && <MobileHeaderSubMenu parentSlug={item.slug} data={item.child_items} />
                                                }
                                            </MobileHeaderMenuLinks>
                                            :
                                            <li key={index}>
                                                <Link to={item.slug === 'home' ? `/${langPrefix}` : `/${langPrefix}${item.slug}`}>
                                                    {item.title}
                                                </Link>
                                            </li>

                                    )
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