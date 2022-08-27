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
    inputType?: string
    placeholder?: string
    onErrorMessage?: string
    regExp?: RegExp
    valueFromProps?: string
    isInputDisabled?: boolean
    isInputBlocked?: boolean
    isFetchPending?: boolean
    onInputHandlerProps?: Function
    required?: boolean
    children: string
}

const InputField = forwardRef((props: InputFieldProps, inputRef: any) => {

    const {
        name,
        inputType = 'text',
        placeholder,
        onErrorMessage,
        regExp,
        valueFromProps,
        isInputDisabled = false,
        isInputBlocked = false,
        isFetchPending = false,
        onInputHandlerProps,
        required = true,
        children
    } = props;

    const [inputValue, setInputValue] = useState<string>('');
    const [onInvalidMessage, setOnInvalidMessage] = useState<string>('');

    useEffect(() => {
        setOnInvalidMessage('');
        valueFromProps && setInputValue(valueFromProps);
    }, [valueFromProps]);

    const onInvalidEvent = new Event('invalid');

    function onInputHandler(onInputEvent: any) {
        if (inputValueRegExMatch(onInputEvent.target.value)) onInputEvent.target.dispatchEvent(onInvalidEvent);
        else {
            onInvalidEvent.preventDefault();
            setOnInvalidMessage('');
        }
        onInputHandlerProps && onInputHandlerProps(onInputEvent);
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
                    ? !prettifyInputValue(value) && setInputValue(value)
                    : true
            }
            else { setInputValue(""); }
        }
        else { setInputValue(value); }
    }

    function prettifyInputValue(inputValue: string): boolean {

        if (inputType == 'text' && inputValue.length == 1) {
            setInputValue(inputValue[0].toUpperCase());
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
                            valueFromProps
                            ? <ValidMessage>
                                ✓
                            </ValidMessage>
                            : inputValue && inputValue.length > 2 &&
                            <ValidMessage>
                                ✓
                            </ValidMessage>
                }
            </StyledLabel>
            <input
                ref={inputRef}
                value={isInputBlocked ? valueFromProps : inputValue}
                name={name}
                type={inputType}
                required={required}
                placeholder={placeholder}
                disabled={isInputDisabled}
                autoComplete="off"
                onInput={(e: any) => onInputHandler(e)}
                onFocus={(e: any) => onFocusHandler(e)}
                onInvalid={onInvalidHandler}
            />
        </>
    )
})

export default InputField;