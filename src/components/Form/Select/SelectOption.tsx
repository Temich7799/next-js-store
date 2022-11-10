import React, { useContext } from "react"
import styled from "styled-components";
import { SelectElementContext } from "./Select";

type SelectOptionProps = {
    value?: any
    children: any
};

const StyledSelectOption = styled.div<any>`
    margin: 0;
    padding: 7px 15px;
    font-family: 'Didact Gothic';
    font-size: 15px;
    color: #393939;
    border-bottom: #c7cbcf 1px solid;
    @media (hover: hover) and (pointer: fine) {
        :hover {
            cursor: pointer;
            background-color: #eeeded;
        }
    }
`;

const SelectOption = (props: SelectOptionProps) => {

    const { setSelectElementValue, setInputValue }: any = useContext(SelectElementContext);

    const { value = null, children } = props;

    function onClickHandler() {
        setInputValue(children);
        setSelectElementValue(value ? value : children);
    }

    return (
        <StyledSelectOption id="option" onClick={onClickHandler}>
            {children}
        </StyledSelectOption>
    )
}

export default SelectOption;