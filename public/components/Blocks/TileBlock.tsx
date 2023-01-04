import styled from "styled-components";
import getRandomColor from "../../services/getRandomColor";

type TileBlockProps = {
    color?: string
}

const TileBlock = styled.div<TileBlockProps>`
    width: 250px;
    height: 150px;
    border-radius: 15px;
    padding: 10px;
    background-color: ${props => props.color ? props.color : () => getRandomColor()};
    @media (hover: hover) and (pointer: fine) {
        :hover {
            background-color: ${() => getRandomColor()};
            transition: 150ms;
        } 
    }
`;

export default TileBlock;