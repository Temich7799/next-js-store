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
    onChangeHandlerProps?: Function
    onInputHandler?: Function
    isInputBlocked?: boolean
}

const Select = forwardRef((props: SelectProps, inputRef: any) => {

    const { name, children, label, onErrorMessage, onChangeHandlerProps, onInputHandler, isInputBlocked = true } = props;

    const [inputValue, setInputValue] = useState<string>('');

    const onInvalidEvent = new Event('invalid');

    const selectRef = useRef<any>();
    const localInputRef = inputRef ? inputRef : useRef<any>();

    useEffect(() =>
        localInputRef.current.addEventListener('focus', (e: React.FocusEvent<HTMLInputElement>) => inputOnFocusHandler(e)), []);

    function inputOnFocusHandler(onFocusEvent: React.FocusEvent<HTMLInputElement>) {
        selectRef.current.style.display = "block";
        onFocusEvent.target.addEventListener('focusout', (focusOutEvent: any) => {
            if (focusOutEvent.relatedTarget != selectRef.current) selectRef.current.style.display = "none";
        });
    }

    function onFocusHandler(onFocusEvent: React.FocusEvent<HTMLSelectElement>) {
        onFocusEvent.target.addEventListener('focusout', (e: any) => e.target.style.display = "none");
    }

    function onChangeHandler(onChangeEvent: React.ChangeEvent<HTMLSelectElement>) {
        onChangeHandlerProps && onChangeHandlerProps(onChangeEvent);
        onChangeEvent.target.style.display = "none";
        onInvalidEvent.preventDefault();
    }

    function onClickHandler(onClickEvent: any) {
        const option = onClickEvent.target.closest('option');
        if (option) setInputValue(option.innerText);
    }

    return (
        <StyledSelectWrapper>
            <InputField ref={localInputRef} name={name} valueFromPropsSelect={inputValue} required
                placeholder="Click To Select"
                onErrorMessage={onErrorMessage}
                isInputBlocked={isInputBlocked}
                onInputHandler={onInputHandler}
            >
                {label}
            </InputField>
            <StyledSelect ref={selectRef} size={10} required
                onFocus={(e: React.FocusEvent<HTMLSelectElement>) => onFocusHandler(e)}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChangeHandler(e)}
                onClick={(e: React.MouseEvent<HTMLSelectElement>) => onClickHandler(e)}
            >
                {children}
            </StyledSelect>
        </StyledSelectWrapper >
    )
})

export default Select;