import * as React from "react"
import styled from "styled-components"

type ButtonProps = {
    children: JSX.Element | string
    size?: string
    id?: string
}

const StyledButton = styled.button<any>`
    font-family: 'Amatic SC';
    border:none;
    background-color: #F7F7F7;
    background: linear-gradient(0deg, rgba(247,247,247,1) 60%, rgba(255,255,255,1) 100%);
    cursor: pointer;
    :hover {
        box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    }
    ${(props) => {
        switch (props.size) {
            case "small":
                return `
                font-size: 14px;
                width: 100px;
                height: 25px;
            `;
            default:
                return `
                font-size: 24px;
                width: 200px;
                height: 50px;
            `;
        }
    }
    }
    `;

const Button = (props: any) => {

    const { children, size, ...rest } = props;

    return (
        <StyledButton size={size} {...rest}>
            {children}
        </StyledButton>
    )
}

export default Button;