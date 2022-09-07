import React from "react"
import styled from "styled-components"
import SubMenuIcon from "../SubMenuIcon";

const StyledMobileHeaderSubMenuTitle = styled.a<any>`
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 10px;
`;

type MobileHeaderSubMenuTitleProps = {
    title: string
    isSubMenuOpened: boolean
    onClickHandler: Function
}

const MobileHeaderSubMenuTitle = (props: MobileHeaderSubMenuTitleProps) => {

    const { title, isSubMenuOpened, onClickHandler } = props;

    return (
        <StyledMobileHeaderSubMenuTitle onClick={onClickHandler}>
            {title}
            <SubMenuIcon isOpened={isSubMenuOpened} />
        </StyledMobileHeaderSubMenuTitle>
    )
}

export default MobileHeaderSubMenuTitle;