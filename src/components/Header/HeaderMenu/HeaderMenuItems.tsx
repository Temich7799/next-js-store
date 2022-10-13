import React, { Fragment, useContext } from "react"
import styled from "styled-components"
import { useHeaderMenuItems } from "../../../services/hooks/gatsby/useHeaderMenuItems";
import { MenuItemType } from "../../../types/MenuItemType";
import { LangContext } from "../../Layouts/Layout";
import HeaderLogo from "./HeaderLogo";
import HeaderMenuItem from "./HeaderMenuItem";

const StyledHeaderMenuItems = styled.ul<any>`

  @media (max-width: ${props => props.minDesktopWidth}px) {
    width: 100%;
    height: 200px;
    padding: 0;
    margin: 0;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    list-style: none;
  }

    display: flex;
    justify-self: center;
    align-items: center;
    list-style: none;
    width: fit-content;
    padding: 0;
`;

const HeaderMenuWrapper = styled.div`
    max-height: 100%;
    width: 100%;
    overflow: scroll;
    scrollbar-width: none;
    //::-webkit-scrollbar { display: none }
`;

const HeaderMenuItems = () => {

    const { language } = useContext(LangContext);
    const data: [MenuItemType] = useHeaderMenuItems(language);

    return (
        <HeaderMenuWrapper>
            <StyledHeaderMenuItems minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
                {
                    data.map(
                        (item: MenuItemType, index: number) =>
                            <Fragment key={index}>
                                {
                                    index == Math.floor(data.length / 2) && <HeaderLogo hideOnMobile={true} />
                                }
                                <HeaderMenuItem data={item} />
                            </Fragment>
                    )
                }
            </StyledHeaderMenuItems>
        </HeaderMenuWrapper>
    )
}

export default HeaderMenuItems;