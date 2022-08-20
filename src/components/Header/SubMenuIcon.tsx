import React from "react"
import styled, { keyframes } from "styled-components"
import ImageSVG from "../ImageSVG";

type SubMenuIconProps = {
    isOpened: boolean
}

const arrowRotate = keyframes`
    from {transform: rotate(0)}
    to {transform: rotate(180)}
`;

const StyledSubMenuIcon = styled.div<SubMenuIconProps>`
    animation: ${arrowRotate} 250ms ${props => props.isOpened ? 'normal' : 'reverse'};
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