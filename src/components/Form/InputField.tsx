import React from "react"

type InputFieldProps = {
    name: string
    children: string
    isRequired?: boolean
}

const InputField = (props: InputFieldProps) => {

    const { name, children, isRequired = false } = props;

    return (
        <>
            <label htmlFor={name}>{children}</label>
            <input name={name} required={isRequired} />
        </>
    )
}

export default InputField;