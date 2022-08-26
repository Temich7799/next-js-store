import React, { forwardRef, useRef } from "react"
import styled from "styled-components";
import Select from "./Select/Select";

type AutocompleteInputProps = {
    name: string
    placeholder: string
    data: Array<string>
    onInputHandler: Function
    onChangeHandler: Function
}

const AutocompleteInput = forwardRef((props: AutocompleteInputProps, inputRef: any) => {
    return (
        <Select name="city" selectLabel="City" onErrorMessage="Please, choose a City from list" isInputBlocked={false}>
            
        </Select>
    )
})

export default AutocompleteInput;