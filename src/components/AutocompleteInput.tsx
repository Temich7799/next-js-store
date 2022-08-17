import React, { forwardRef, useRef } from "react"
import styled from "styled-components";
import SelectOption from "./Form/Select/SelectOption";

const StyledAutocompleteInput = styled.div`
    position: relative;
    width: 90% !important;
    input {
        width: 100% !important;
        margin-bottom: 0;    
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
`;

const StyledSelect = styled.select`
    display: none;
    position: absolute;
    width: 107.7% !important;
    height: 125px !important;
    background-color: hsl(0,0%,99.6078431372549%);
    border: 1px solid #818a91;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    z-index: 100;
    border-top: none;
`;

type AutocompleteInputProps = {
    name: string
    placeholder: string
    data: Array<string>
    onInputHandler: Function
    onChangeHandler: Function
}

const AutocompleteInput = forwardRef((props: AutocompleteInputProps, inputRef: any) => {

    const { name, placeholder, data, onInputHandler, onChangeHandler } = props;

    //const inputRef = useRef<any>();
    const selectRef = useRef<any>();

    function inputOnFocusHandler(onFocusEvent: React.FocusEvent<HTMLInputElement>) {
        selectRef.current.style.display = onFocusEvent.target.value.length > 1 ? "block" : "none";
        onFocusEvent.target.addEventListener('input', (e: any) => {
            onInputHandler(e.target.value);
            selectRef.current.style.display = onFocusEvent.target.value.length > 1 ? "block" : "none";
        });
        onFocusEvent.target.addEventListener('focusout', (focusOutEvent: any) => {
            if (focusOutEvent.relatedTarget != selectRef.current) selectRef.current.style.display = "none"
        });
    }

    function inputOnSubmitHandler(): boolean { return inputRef.current.value == selectRef.current.value ? true : false }

    function selectOnChangeHandler(onChangeEvent: React.ChangeEvent<HTMLSelectElement>) {
        onChangeHandler(onChangeEvent.target.value);
        inputRef.current.value = onChangeEvent.target.value;
        onChangeEvent.target.style.display = "none";
    }

    function selectOnFocusHandler(onFocusEvent: React.FocusEvent<HTMLSelectElement>) {
        onFocusEvent.target.addEventListener('focusout', (e: any) => e.target.style.display = "none");
    }

    return (
        <StyledAutocompleteInput>

            <label htmlFor={name}>City</label>
            <input ref={inputRef}
                placeholder={placeholder}
                autoComplete="off"
                required
                onSubmit={inputOnSubmitHandler}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => inputOnFocusHandler(e)}
            />

            <StyledSelect
                size={10}
                ref={selectRef}
                name={name}
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectOnChangeHandler(e)}
                onFocus={(e: React.FocusEvent<HTMLSelectElement>) => selectOnFocusHandler(e)}
            >
                {data.map((city: string) => <SelectOption>{city}</SelectOption>)}
            </StyledSelect>

        </StyledAutocompleteInput>
    )
})

export default AutocompleteInput;