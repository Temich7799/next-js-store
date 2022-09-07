import React, { useState, Fragment } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import HeaderSubMenu from "../DesktopHeaderMenu/HeaderSubMenu";
import SubMenuIcon from "../SubMenuIcon";

type DesktopHeaderMenuProps = {
    data: [
        {
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
    ]
}

const StyledDesktopHeaderMenu = styled.nav`
    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        justify-self: center;
        align-items: center;
        list-style: none;
        width: fit-content;
        padding: 0;
        li {
            padding: 3px 15px 1px;
            &:hover {
                font-weight: 700;
            }
        }
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
            <ul>
                {
                    data.map(
                        (link: any, index: number) =>
                            <Fragment key={index}>
                                {
                                    index == Math.floor(data.length / 2) &&
                                    <Link to="/">
                                        <StaticImage src="../../../../images/logo.png" alt="Logo" placeholder="blurred" layout="fixed" width={100} height={100} />
                                    </Link>
                                }
                                {
                                    !link.parentId &&
                                    <li>
                                        {
                                            (link.childItems.nodes.length)
                                                ?
                                                <div onMouseOver={(e: any) => onMouseOverHandler(e)}>
                                                    <Link to={link.url != '/home/' ? link.url : '/'}>
                                                        <SubMenuTitle>
                                                            {link.label}
                                                            <SubMenuIcon isOpened={isMouseOver} />
                                                        </SubMenuTitle>
                                                    </Link>
                                                    {isMouseOver && <HeaderSubMenu childItems={link.childItems.nodes} />}
                                                </div>
                                                : <Link to={link.url != '/home/' ? link.url : '/'}>{link.label}</Link>
                                        }
                                    </li>
                                }
                            </Fragment>
                    )
                }
            </ul>
        </StyledDesktopHeaderMenu >
    )
}

export default DesktopHeaderMenu;