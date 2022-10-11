import React, { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components";
import { LangContext } from "../../Layouts/Layout";
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
    label: string
    onErrorMessage?: string
    placeHolder?: any
    isInputBlocked?: boolean
    isInputDisabled?: boolean
    isSelectClosed?: boolean
    isFetchPending?: boolean
    onChangeHandler?: Function
    onInputHandler?: Function
    resetOptionsData?: Function
    dependencies?: Array<any>
    children: any | undefined
}

const Select = (props: SelectProps) => {

    const language = useContext(LangContext);
    const { SELECT_PLACEHOLDER } = require(`../../../languages/${language}/languages`);

    const {
        name,
        label,
        onErrorMessage,
        placeHolder,
        isInputDisabled = false,
        isSelectClosed = true,
        isFetchPending = false,
        resetOptionsData,
        onChangeHandler,
        onInputHandler,
        dependencies,
        children
    } = props;

    let { isInputBlocked = true } = props;
    if (onInputHandler) isInputBlocked = false;

    const [inputValue, setInputValue] = useState<string>('');

    const onInvalidEvent = new Event('invalid');

    const selectRef = useRef<any>();
    const inputRef = useRef<any>();

    dependencies && useEffect(() => {
        setInputValue('');
        resetOptionsData && resetOptionsData();
    }, dependencies)

    useEffect(() => {
        inputRef.current.addEventListener('focus', inputOnFocusHandler);
        inputRef.current.addEventListener('focusout', (e: any) => inputOnFocusOutHandler(e));
    }, []);

    const [isSelectShown, setIsSelectShown] = useState<boolean>(false);
    useEffect(() => {
        if (isSelectShown) inputRef.current.dispatchEvent(new Event('focus'));
        else setIsSelectShown(true);
    }, [isSelectClosed]);

    function inputOnFocusHandler() {
        selectRef.current.style.display = selectRef.current.children.length > 0 ? "block" : "none"
    }

    function inputOnFocusOutHandler(onFocusOutEvent: any) {
        if (onFocusOutEvent.relatedTarget != selectRef.current) selectRef.current.style.display = "none";
    }

    function selectOnFocusHandler(onFocusEvent: React.FocusEvent<HTMLSelectElement>) {
        onFocusEvent.target.addEventListener('focusout', (e: any) => e.target.style.display = "none");
    }

    function selectOnChangeHandler(onChangeEvent: React.ChangeEvent<HTMLSelectElement>) {
        onChangeHandler && onChangeHandler(onChangeEvent);
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
                placeholder={placeHolder ? placeHolder : SELECT_PLACEHOLDER}
                valueFromProps={inputValue}
                onErrorMessage={onErrorMessage}
                isInputBlocked={isInputBlocked}
                isInputDisabled={isInputDisabled}
                isFetchPending={isFetchPending}
                onInputHandlerProps={onInputHandler}
                required
            >
                {label}
            </InputField>
            <StyledSelect
                ref={selectRef}
                size={10}
                onFocus={(e: React.FocusEvent<HTMLSelectElement>) => selectOnFocusHandler(e)}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectOnChangeHandler(e)}
                onClick={(e: React.MouseEvent<HTMLSelectElement>) => onClickHandler(e)}
            >
                {children}
            </StyledSelect>
        </StyledSelectWrapper >
    )
}

export default Select;