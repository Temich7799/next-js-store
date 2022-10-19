import React from "react"
import styled from "styled-components";

const StyledSelectOption = styled.option<any>`
    vertical-align: middle;
    width: 387px;
    margin: 0;
    padding: 7px 15px;
    color: #393939;
    border-bottom: #c7cbcf 1px solid;
    @media (hover: hover) and (pointer: fine) {
        :hover {
            cursor: pointer;
            background-color: #eeeded;
        }
    }
`;

const SelectOption = (props: any) => {

    const { children } = props;

    return (
        <StyledSelectOption {...props}>
            {children}
        </StyledSelectOption>
    )
}

export default SelectOption;