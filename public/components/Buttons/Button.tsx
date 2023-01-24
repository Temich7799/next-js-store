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
            min-width: 150px;
            width: fit-content;
            height: 50px;
        `;
    }
}

function buttonStylePropsHandler(style: string | undefined) {
    switch (style) {
        case "transparent":
            return `
            padding: 2px;
            color: black;
            font-size: 25px;
            border: none;
            background: none;
            @media (hover: hover) and (pointer: fine) {
                :hover {
                    box-shadow: none;
                    transform: scale(1.1);
                }
            }
        `;
        case "accent":
            return `
            color: #F7F7F7;
            background: #d888a9;
        `;
        default:
            return `
            border:none;
            color: white;
            background-color: #9ed6e4;
        `;
    }
}

const StyledButton = styled.button<any>`
    position: relative;
    font-family: 'Noto Serif';
    font-size: 16px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    @media (hover: hover) and (pointer: fine) {
        :hover {
            box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
        }
    }
    :disabled{
        filter: grayscale(100%);
        @media (hover: hover) and (pointer: fine) {
            :hover{
                box-shadow: none;
            }
        }
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