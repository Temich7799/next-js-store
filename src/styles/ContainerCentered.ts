import styled from "styled-components";

type ContainerCenteredProps = {
    direction?: string
};

const ContainerCentered = styled.div<ContainerCenteredProps>`
    height: 70vh;
    width: 80%;
    margin: 2.5% auto;
    display: flex;
    align-items: center;
    gap: 15px;
    flex-direction: ${props => props.direction ? props.direction : 'column'};
    justify-content: space-around;
`;

export default ContainerCentered;