import * as React from "react"
import styled from "styled-components"

function buttonSizePropsHandler(size: string | undefined) {
    switch (size) {
        case "small":
            return `
            font-size: 14px;
            width: 100px;
            height: 25px;
        `;
        case "shrink":
            return `
            width: fit-content;
            height: fit-content;
        `;
        default:
            return `
            font-size: 24px;
            width: 200px;
            height: 50px;
        `;
    }
}

function buttonStylePropsHandler(style: string | undefined) {
    switch (style) {
        case "transparent":
            return `
            border: none;
            background: none;
            :hover {
                box-shadow: none;
                transform: scale(1.1);
            }
        `;
        case "accent":
            return `
            border-radius: 5px;
            color: #F7F7F7;
            background: #8BDEC6;
        `;
        default:
            return `
            border:none;
            background-color: #F7F7F7;
            background: linear-gradient(0deg, rgba(247,247,247,1) 60%, rgba(255,255,255,1) 100%);
        `;
    }
}

const StyledButton = styled.button<any>`
    font-family: 'Amatic SC';
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    :hover {
        box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    }
    ${(props) => buttonSizePropsHandler(props.buttonSize)}
    ${(props) => buttonStylePropsHandler(props.buttonStyle)}
`;

const Button = (props: any) => {

    const { children, ...rest } = props;

    return (
        <StyledButton {...rest}>
            {children}
        </StyledButton>
    )
}

export default Button;