import React from "react"
import InputField from "../../../Form/InputField";

const ClientContacts = () => {

    const validName = /[А-я]/;
    const onInvalidNameMessage = 'The field must contain only Cyrillic characters';

    const validPhone = /[0-9-+]/;
    const onInvalidPhoneMessage = 'Please, enter a phone number in the correct format';

    return (
        <>
            <InputField name="first_name" regExp={validName} onErrorMessage={onInvalidNameMessage} required>Name</InputField>
            <InputField name="last_name" regExp={validName} onErrorMessage={onInvalidNameMessage} required>Last Name</InputField>
            <InputField type="tel" name="phone" regExp={validPhone} onErrorMessage={onInvalidPhoneMessage} required>Phone</InputField>
        </>
    )
}

export default ClientContacts;