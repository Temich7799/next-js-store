import React from "react";
import ContainerCentered from "../../../styles/ContainerCentered";
import ImageSVG from "../../ImageSVG";

type InfoLayoutProps = {
    title: string
    description: string
    details?: string
    imagePath: string
    children?: JSX.Element | never[]
}

const InfoLayout = (props: InfoLayoutProps) => {

    const { title, description, details, imagePath, children } = props;

    return (
        <ContainerCentered>
            <>
                <h3>{title}</h3>
                {
                    details && <p>{details}</p>
                }
                <ImageSVG path={imagePath} width="50%" height="50%" />
                <p>{description}</p>
                {children && children}
            </>
        </ContainerCentered>
    )
}

export default InfoLayout;