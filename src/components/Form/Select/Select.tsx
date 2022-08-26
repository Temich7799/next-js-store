import React, { useEffect, useRef, useState } from "react"
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
    isInputDisabled?: boolean
    dependencies?: Array<any>
    resetOptionsData?: Function
}

const Select = (props: SelectProps) => {

    const {
        name,
        children,
        label,
        onErrorMessage,
        onChangeHandlerProps,
        onInputHandler,
        isInputDisabled = false,
        isInputBlocked = true,
        dependencies,
        resetOptionsData
    } = props;

    const [inputValue, setInputValue] = useState<string>('');

    const onInvalidEvent = new Event('invalid');

    const selectRef = useRef<any>();
    const inputRef = useRef<any>();

    dependencies && useEffect(() => {
        setInputValue('');
        resetOptionsData && resetOptionsData();
    }, dependencies)

    useEffect(() =>
        inputRef.current.addEventListener('focus', (e: React.FocusEvent<HTMLInputElement>) => inputOnFocusHandler(e)), []);

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
            <InputField
                ref={inputRef}
                name={name}
                placeholder={!isInputDisabled ? "Click To Select" : ""}
                valueFromSelect={inputValue}
                onErrorMessage={onErrorMessage}
                isInputBlocked={isInputBlocked}
                isInputDisabled={isInputDisabled}
                onInputHandler={onInputHandler}
                required
            >
                {label}
            </InputField>
            <StyledSelect
                ref={selectRef}
                size={10}
                onFocus={(e: React.FocusEvent<HTMLSelectElement>) => onFocusHandler(e)}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChangeHandler(e)}
                onClick={(e: React.MouseEvent<HTMLSelectElement>) => onClickHandler(e)}
            >
                {children}
            </StyledSelect>
        </StyledSelectWrapper >
    )
}

export default Select;