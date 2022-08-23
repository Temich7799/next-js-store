import React from "react"
import InputField from "../../../Form/InputField";

const ClientContacts = () => {

    const validName = /[А-я]/;
    const onInvalidNameMessage = 'The field must contain only Cyrillic characters';

    const validPhone = /[0-9]/;
    const onInvalidPhoneMessage = 'Please, enter a phone number in the correct format';

    function prettifyPhoneNumber(value: string): string {

        const shift = (value[0] == "3") ? 0 : 3;

        switch (value.length) {
            case 2 - shift: return `${value} `; break;
            case 6 - shift: return `${value} `; break;
            case 10 - shift: return `${value} `; break;
            case 13 - shift: return `${value} `; break;
        }
    }

    return (
        <>
            <InputField name="first_name" regExp={validName} onErrorMessage={onInvalidNameMessage} required>Name</InputField>
            <InputField name="last_name" regExp={validName} onErrorMessage={onInvalidNameMessage} required>Last Name</InputField>
            <InputField type="tel" name="phone" regExp={validPhone} onErrorMessage={onInvalidPhoneMessage} prettifyFunction={prettifyPhoneNumber} required>Phone</InputField>
        </>
    )
}

export default ClientContacts;