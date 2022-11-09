import React from "react"
import styled from "styled-components"

type SubMenuIconProps = {
    isOpened: boolean
}

const StyledSubMenuIcon = styled.p<SubMenuIconProps>`
    width: 25px;
    height: 25px;
    font-size: 20px;
    color: ${props => props.isOpened ? '#d888a9' : '#585858'};
    transition: 150ms;
    transform: rotate(${props => props.isOpened ? '-90deg' : '90deg'});
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