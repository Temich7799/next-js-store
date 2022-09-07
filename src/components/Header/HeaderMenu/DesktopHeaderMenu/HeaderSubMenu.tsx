import React from "react"
import styled from "styled-components"
import { formatCatalogChildItemUrl } from "../../../../services/formatCatalogChildItemUrl";

const StyledHeaderSubMenu = styled.div`
    font-size: 16px;
    font-weight: normal !important;
    position: absolute;
    top: 100px;
    width: fit-content;
    min-height: 50px;
    background-color: #fefefe;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    z-index: 1000;
    ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
        li {
            text-shadow: none;
            :hover {
                text-shadow: 0.25px 0 0 currentColor;
            }
        }
    }
`;

type SubMenuProps = {
    childItems: [
        {
            url: string
            label: string
        }
    ]
}

const HeaderSubMenu = (props: SubMenuProps) => {

    const { childItems } = props;

    return (
        <StyledHeaderSubMenu>
            <ul>
                {
                    childItems.map((childItem: any, index: number) =>
                        <li key={index}>
                            <a href={formatCatalogChildItemUrl(childItem.url != '/home/' ? childItem.url : '/')}>
                                {childItem.label}
                            </a>
                        </li>)
                }
            </ul>
        </StyledHeaderSubMenu >
    )
}

export default HeaderSubMenu;