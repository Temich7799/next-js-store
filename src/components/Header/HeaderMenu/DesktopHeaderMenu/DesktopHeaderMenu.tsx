import React, { useState, Fragment } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import HeaderSubMenu from "../DesktopHeaderMenu/HeaderSubMenu";
import SubMenuIcon from "../SubMenuIcon";
import { MenuItemType } from "../../../../types/MenuItemType";

type DesktopHeaderMenuProps = {
    data: [MenuItemType]
}

const StyledDesktopHeaderMenu = styled.nav`
    @media (max-width: 820px) {
        display: none;
    }
`;

const DesktopHeaderMenuItems = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    justify-self: center;
    align-items: center;
    list-style: none;
    width: fit-content;
    padding: 0;
`;

const DesktopHeaderMenuItem = styled.li`
    padding: 3px 15px 1px;
    &:hover {
        text-shadow: 0.25px 0 0 currentColor;
    }
`;

const SubMenuTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const DesktopHeaderMenu = (props: DesktopHeaderMenuProps) => {

    const { data } = props;

    const [isMouseOver, setIsMouseOver] = useState(false);

    function onMouseOverHandler(mouseOverEvent: React.MouseEvent<MouseEvent>): void {
        setIsMouseOver(true);
        mouseOverEvent.target.addEventListener('mouseleave', () => { setIsMouseOver(false) });
    }

    return (
        <StyledDesktopHeaderMenu>
            <DesktopHeaderMenuItems>
                {
                    data.map(
                        (item: MenuItemType, index: number) =>
                            <Fragment key={index}>
                                {
                                    index == Math.floor(data.length / 2) &&
                                    <Link to="/">
                                        <StaticImage src="../../../../images/logo.png" alt="Logo" placeholder="blurred" layout="fixed" width={100} height={100} />
                                    </Link>
                                }
                                {
                                    <DesktopHeaderMenuItem>
                                        {
                                            item.child_items !== null
                                                ?
                                                <div onMouseOver={(e: any) => onMouseOverHandler(e)}>
                                                    <Link to={item.slug === 'home' ? '/' : `/${item.slug}`}>
                                                        <SubMenuTitle>
                                                            {item.title}
                                                            <SubMenuIcon isOpened={isMouseOver} />
                                                        </SubMenuTitle>
                                                    </Link>
                                                    {isMouseOver && <HeaderSubMenu data={item.child_items} />}
                                                </div>
                                                :
                                                <Link to={item.slug === 'home' ? '/' : `/${item.slug}`}>
                                                    {item.title}
                                                </Link>
                                        }
                                    </DesktopHeaderMenuItem>
                                }
                            </Fragment>
                    )
                }
            </DesktopHeaderMenuItems>
        </StyledDesktopHeaderMenu >
    )
}

export default DesktopHeaderMenu;