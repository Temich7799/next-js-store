import React, { forwardRef, useEffect, useState } from "react"
import styled from "styled-components"
import LoadingBar from "../LoadingBar";

const StyledLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ErrorMessage = styled.p`
    margin: 0;
    font-size: 12px;
    color: red;
`;

const ValidMessage = styled(ErrorMessage)`
    color: #5eff00;
`;

type InputFieldProps = {
    name: string
    type?: string
    placeholder?: string
    onErrorMessage?: string
    regExp?: RegExp
    valueFromSelect?: string
    isInputDisabled?: boolean
    isInputBlocked?: boolean
    isFetchPending?: boolean
    onInputHandler?: Function
    prettifyFunction?: Function
    required?: boolean
    children: string
}

const InputField = forwardRef((props: InputFieldProps, inputRef: any) => {

    const {
        name,
        type = "text",
        placeholder,
        onErrorMessage,
        regExp,
        valueFromSelect,
        isInputDisabled = false,
        isInputBlocked = false,
        isFetchPending = false,
        onInputHandler,
        prettifyFunction,
        required = true,
        children
    } = props;

    const [inputValue, setInputValue] = useState<string>('');
    const [onInvalidMessage, setOnInvalidMessage] = useState<string>('');

    useEffect(() => {
        setOnInvalidMessage('');
        setInputValue(valueFromSelect);
    }, [valueFromSelect]);

    const onInvalidEvent = new Event('invalid');

    function onChangeHandler(onChangeEvent: any) {
        onInputHandler && onInputHandler(onChangeEvent);
        if (inputValueRegExMatch(onChangeEvent.target.value)) onChangeEvent.target.dispatchEvent(onInvalidEvent);
        else {
            prettifyFunction && setInputValue(prettifyFunction(onChangeEvent.target.value));
            onInvalidEvent.preventDefault();
            setOnInvalidMessage('');
        }
    }

    function onFocusHandler(onFocusOutEvent: any) {
        onFocusOutEvent.target.addEventListener('focusout', () =>
            !inputValueRegExMatch(onFocusOutEvent.target.value) && setOnInvalidMessage(''));
    }

    function onInvalidHandler() {
        onErrorMessage && setOnInvalidMessage(onErrorMessage);
    }

    function inputValueRegExMatch(value: string): void | boolean {
        if (regExp) {
            if (value.length) {
                return value[value.length - 1].match(regExp)
                    ? !firstLetterToUpperCase(value) && setInputValue(value)
                    : true
            }
            else { setInputValue(""); }
        }
        else { setInputValue(value); }
    }

    function firstLetterToUpperCase(value: string): boolean {
        if (value.length == 1) {
            setInputValue(value[0].toUpperCase());
            return true;
        }
        return false;
    }

    return (
        <>
            <StyledLabel>
                <label htmlFor={name}>{children}</label>
                <ErrorMessage>{onInvalidMessage}</ErrorMessage>
                {
                    isFetchPending
                        ? <span><LoadingBar /></span>
                        : !onInvalidMessage &&
                            valueFromSelect
                            ? <ValidMessage>
                                ✓
                            </ValidMessage>
                            : inputValue && inputValue.length > 2 && <ValidMessage>✓</ValidMessage>
                }
            </StyledLabel>
            <input
                ref={inputRef}
                value={isInputBlocked ? valueFromSelect : inputValue}
                name={name}
                type={type}
                required={required}
                placeholder={placeholder}
                disabled={isInputDisabled}
                autoComplete="off"
                onChange={(e: any) => onChangeHandler(e)}
                onFocus={(e: any) => onFocusHandler(e)}
                onInvalid={onInvalidHandler}
            />
        </>
    )
})

export default InputField;