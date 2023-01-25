import React from "react";
import styled from "styled-components";
import ContainerCenteredWrapper from "./Wrappers/ContainerCenteredWrapper";
import ImageSVG from "./ImageSVG";

type InfoLayoutProps = {
    title: string
    description: string
    details?: string
    imagePath: string
    children?: JSX.Element | never[]
}

const StyledInfoLayout = styled.div`
    text-align: center;
`;

const InfoLayout = (props: InfoLayoutProps) => {

    const { title, description, details, imagePath, children } = props;

    return (
        <StyledInfoLayout>
            <ContainerCenteredWrapper>
                <h3>{title}</h3>
                {
                    details && <p>{details}</p>
                }
                <ImageSVG path={imagePath} width="50%" height="50%" />
                <p>{description}</p>
                {children && children}
            </ContainerCenteredWrapper>
        </StyledInfoLayout>
    )
}

export default InfoLayout;