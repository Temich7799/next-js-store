import React from "react"
import InputField from "../../../Form/InputField";

const ClientContacts = () => {
    return (
        <>
            <InputField name="first_name" isRequired>Name</InputField>
            <InputField name="last_name" isRequired>Last Name</InputField>
            <InputField type="tel" name="phone" isRequired>Phone</InputField>
        </>
    )
}

export default ClientContacts;