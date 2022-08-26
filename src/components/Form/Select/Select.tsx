import React, { forwardRef, useEffect, useRef, useState } from "react"
import styled from "styled-components";
import InputField from "../InputField";

const StyledSelectWrapper = styled.div`
    position: relative;
`;

const StyledSelect = styled.select<any>`
    position: absolute;
    display: none;
    width: 100%;
    height: 125px !important;
    background-color: hsl(0,0%,99.6078431372549%);
    border: 1px solid #818a91;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    z-index: 100;
`;

type SelectProps = {
    name: string
    children: any
    label: string
    onErrorMessage?: string
    onChangeHandler?: Function
}

const Select = forwardRef((props: SelectProps, inputRef: any) => {

    const { name, children, label, onErrorMessage, onChangeHandler, ...rest } = props;

    const [inputValue, setInputValue] = useState<string>('');

    const onInvalidEvent = new Event('invalid');
    const selectRef = useRef<any>();

    function inputOnFocusHandler(onFocusEvent: React.FocusEvent<HTMLInputElement>) {
        selectRef.current.style.display = "block";
        onFocusEvent.target.addEventListener('focusout', (focusOutEvent: any) => {
            if (focusOutEvent.relatedTarget != selectRef.current) selectRef.current.style.display = "none";
        });
    }

    function selectOnFocusHandler(onFocusEvent: React.FocusEvent<HTMLSelectElement>) {
        onFocusEvent.target.addEventListener('focusout', (e: any) => e.target.style.display = "none");
    }

    function selectOnChangeHandler(onChangeEvent: React.ChangeEvent<HTMLSelectElement>) {
        onChangeHandler && onChangeHandler(onChangeEvent);
        onChangeEvent.target.style.display = "none";
        onInvalidEvent.preventDefault();
    }

    function selectOnClickHandler(onClickEvent: any) {
        const option = onClickEvent.target.closest('option');
        if (option) setInputValue(option.innerText);
    }

    return (
        <StyledSelectWrapper>
            <InputField ref={inputRef} name={name} valueFromPropsSelect={inputValue} required
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => inputOnFocusHandler(e)}
                placeholder="Click To Select"
                onErrorMessage={onErrorMessage}
                isInputBlocked={true}
            >
                {label}
            </InputField>
            <StyledSelect ref={selectRef} size={10} required {...rest}
                onFocus={(e: React.FocusEvent<HTMLSelectElement>) => selectOnFocusHandler(e)}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectOnChangeHandler(e)}
                onClick={(e: React.MouseEvent<HTMLSelectElement>) => selectOnClickHandler(e)}
            >
                {children}
            </StyledSelect>
        </StyledSelectWrapper >
    )
})

export default Select;