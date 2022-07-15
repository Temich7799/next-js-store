import * as React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
    font-family: 'Amatic SC';
    font-size: 24px;
    width: 200px;
    height: 50px;
    border:none;
    background-color: #F7F7F7;
    background: linear-gradient(0deg, rgba(247,247,247,1) 60%, rgba(255,255,255,1) 100%);
    cursor: pointer;
`;

const Button = ({ children }: any) => {
    return (
        <StyledButton>
            {children}
        </StyledButton>
    )
}

export default Button;