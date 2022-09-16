import styled from "styled-components";

type MainProps = {
    isMobile?: boolean
}

export const Main = styled.main<MainProps>`
    margin-top: ${props => props.isMobile ? "125px" : "0"};
`;