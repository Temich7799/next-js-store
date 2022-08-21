import React from "react"
import styled from "styled-components"
import ImageSVG from "../ImageSVG";

type SubMenuIconProps = {
    isOpened: boolean
}

const StyledSubMenuIcon = styled.div<SubMenuIconProps>`
    transition: 250ms;
    transform: rotate(${props => props.isOpened ? '180deg' : '0deg'});
`;

const SubMenuIcon = (props: SubMenuIconProps) => {

    const { isOpened } = props;

    return (
        <StyledSubMenuIcon isOpened={isOpened}>
            <ImageSVG path="svg/arrow_more.svg" width="20px" height="20px" />
        </StyledSubMenuIcon>
    )
}

export default SubMenuIcon;