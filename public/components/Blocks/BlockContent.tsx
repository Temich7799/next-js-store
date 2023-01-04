import React from "react";
import styled from "styled-components";
import ImageSVG from "../ImageSVG";

type BlockContentProps = {
    title: string
    count: number | string
    iconPath: string
    gridTemplateAreas: string
    children?: any
}

const StyledBlockContent = styled.div<any>`
    height: 100%;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr; 
    grid-template-rows: 1fr 1fr 1fr 1fr; 
    grid-template-areas: "${props => props.gridTemplateAreas}";
`;

const Title = styled.h4`
    color: #00000040;
    grid-area: Title;
`;

const Count = styled.p`
    height: fit-content;
    margin: auto 15px;
    font-size: 50px;
    color: white;
    grid-area: Count;
`;

const Icon = styled.div`
    grid-area: Icon;
`;

const Details = styled.div`
    padding: 5%;
    grid-area: Details;
`;

const BlockContent = (props: BlockContentProps) => {

    const { title, count, iconPath, children, gridTemplateAreas } = props;

    return (
        <StyledBlockContent gridTemplateAreas={gridTemplateAreas}>
            <Title>{title}</Title>
            <Count>{count}</Count>
            <Icon><ImageSVG path={iconPath} width='30px' height="30px" /></Icon>
            <Details>
                {children}
            </Details>
        </StyledBlockContent>
    )
}

export default BlockContent;