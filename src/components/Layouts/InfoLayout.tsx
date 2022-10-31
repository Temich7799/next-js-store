import React from "react";
import styled from "styled-components";
import ContainerCentered from "../../styles/ContainerCentered";
import ImageSVG from "../ImageSVG";

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
            <ContainerCentered>
                <h3>{title}</h3>
                {
                    details && <p>{details}</p>
                }
                <ImageSVG path={imagePath} width="50%" height="50%" />
                <p>{description}</p>
                {children && children}
            </ContainerCentered>
        </StyledInfoLayout>
    )
}

export default InfoLayout;