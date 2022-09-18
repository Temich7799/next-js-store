import React from "react"
import styled from "styled-components"

type SubMenuIconProps = {
    isOpened: boolean
}

const StyledSubMenuIcon = styled.p<SubMenuIconProps>`
    font-size: 20px;
    transition: 250ms;
    transform: rotate(${props => props.isOpened ? '90deg' : '-90deg'});
`;

const SubMenuIcon = (props: SubMenuIconProps) => {

    const { isOpened } = props;

    return (
        <StyledSubMenuIcon isOpened={isOpened}>
            {">"}
        </StyledSubMenuIcon>
    )
}

export default SubMenuIcon;