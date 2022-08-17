import React, { forwardRef } from "react"
import { useRef } from "react";
import styled from "styled-components";

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

const Select = forwardRef((props: any, selectRef: any) => {

    const { children, placeHolder } = props;

    const inputRef = useRef<any>();
    //const selectRef = useRef<any>();

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
        onChangeEvent.target.style.display = "none";
    }

    function selectOnClickHandler(onClickEvent: any) {
        const option = onClickEvent.target.closest('option');
        if (option) inputRef.current.value = option.innerText;
    }

    return (
        <StyledSelectWrapper>
            <input ref={inputRef} autoComplete="off" placeholder={placeHolder} required
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => inputOnFocusHandler(e)}
            />
            <StyledSelect ref={selectRef} size={10} required {...props}
                onFocus={(e: React.FocusEvent<HTMLSelectElement>) => selectOnFocusHandler(e)}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectOnChangeHandler(e)}
                onClick={(e: React.MouseEvent<HTMLSelectElement>) => selectOnClickHandler(e)}
            >
                {children}
            </StyledSelect>
        </StyledSelectWrapper>
    )
})

export default Select;