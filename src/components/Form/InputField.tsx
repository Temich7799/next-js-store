import React from "react"

type InputFieldProps = {
    name: string
    children: string
    isRequired?: boolean
    type?: string
    pattern?: string
}

const InputField = (props: InputFieldProps) => {

    const { name, children, type = "text", pattern, isRequired = false, ...rest } = props;

    return (
        <>
            <label htmlFor={name}>{children}</label>
            <input name={name} type={type} pattern={pattern} required={isRequired} {...rest} />
        </>
    )
}

export default InputField;