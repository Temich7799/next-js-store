import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components";
import { LangContext } from "../../Layouts/Layout";
import InputField from "../InputField";

const StyledSelectWrapper = styled.div`
    position: relative;
`;

const StyledSelect = styled.div<any>`
    position: absolute;
    display: none;
    width: 98%;
    max-height: 200px;
    background-color: hsl(0,0%,99.6078431372549%);
    border: 1px solid #8ed8e6;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    overflow-y: scroll;
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

export const SelectElementContext: any = createContext({});

const Select = (props: SelectProps) => {

    const { language } = useContext(LangContext);
    const { SELECT_PLACEHOLDER } = require(`../../../languages/${language}/languages`);

    const {
        name, label, onErrorMessage, placeHolder,
        isInputDisabled = false,
        isSelectClosed = true,
        isFetchPending = false,
        resetOptionsData, onChangeHandler, onInputHandler, dependencies, children
    } = props;

    let { isInputBlocked = true } = props;
    if (onInputHandler) isInputBlocked = false;

    const [inputValue, setInputValue] = useState<string>('');
    const [selectElementValue, setSelectElementValue] = useState<string | number | undefined>(undefined);

    const onInvalidEvent = new Event('invalid');

    const selectRef = useRef<any>({
        value: selectElementValue
    });
    const inputRef = useRef<any>();

    dependencies && useEffect(() => {
        setInputValue('');
        resetOptionsData && resetOptionsData();
    }, dependencies)

    useEffect(() => {

        inputRef.current.addEventListener('focus', inputOnFocusHandler);
        inputRef.current.addEventListener('focusout', inputOnFocusOutHandler);
        selectRef.current.addEventListener('focus', selectOnFocusHandler);
        selectRef.current.addEventListener('change', selectOnChangeHandler);

        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('focus', inputOnFocusHandler);
                inputRef.current.removeEventListener('focusout', inputOnFocusOutHandler);
            }
            if (selectRef.current) {
                selectRef.current.removeEventListener('focus', selectOnFocusHandler);
                selectRef.current.removeEventListener('change', selectOnChangeHandler);
            }
        }
    }, []);

    useEffect(() => {
        if (selectElementValue) {
            selectRef.current.value = selectElementValue;
            selectRef.current.dispatchEvent(new Event('change'));
        }
    }, [selectElementValue]);

    const [isSelectShown, setIsSelectShown] = useState<boolean>(false);
    useEffect(() => {
        if (isSelectShown) inputRef.current.dispatchEvent(new Event('focus'));
        else setIsSelectShown(true);
    }, [isSelectClosed]);

    function inputOnFocusHandler() {
        selectRef.current.style.display = selectRef.current.children.length > 0 ? "block" : "none";
    }

    function inputOnFocusOutHandler() {
        window.addEventListener('click', onClickHandler);
    }

    function onClickHandler(clickedElement: any) {
        if (clickedElement !== selectRef.current) {
            selectRef.current.style.display = "none";
        }
        window.removeEventListener('click', onClickHandler);
    }

    function selectOnFocusHandler(onFocusEvent: React.FocusEvent<HTMLSelectElement>) {
        onFocusEvent.target.addEventListener('focusout', (e: any) => e.target.style.display = "none");
    }

    function selectOnChangeHandler(onChangeEvent: React.ChangeEvent<HTMLSelectElement>) {
        onChangeHandler && onChangeHandler(onChangeEvent);
        inputRef.current.setAttribute('selected-value', onChangeEvent.target.value)
        onChangeEvent.target.style.display = "none";
        onInvalidEvent.preventDefault();
    }

    return (
        <SelectElementContext.Provider value={{ setSelectElementValue: setSelectElementValue, setInputValue: setInputValue }}>
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
                <StyledSelect ref={selectRef} >
                    {children}
                </StyledSelect>
            </StyledSelectWrapper>
        </SelectElementContext.Provider>
    )
}

export default Select;