import React from "react"
import InputField from "../../../Form/InputField";

const ClientContacts = () => {

    const validName = /[А-я]/;
    const onInvalidNameMessage = 'The field must contain only Cyrillic characters';

    const validPhone = /[0-9]/;
    const onInvalidPhoneMessage = 'Please, enter a phone number in the correct format';

    /*
        function prettifyPhoneNumber(setInputValue: React.Dispatch<React.SetStateAction<string>>): void {
    
            const inputValue = phoneNumberInput.current.value;
            const shift = (inputValue[0] == "3") ? 0 : 3;
            
                    switch (inputValue.length) {
                        case 2 - shift: setInputValue(`${inputValue} `);
                        case 6 - shift: setInputValue(`${inputValue} `);
                        case 10 - shift: setInputValue(`${inputValue} `);
                        case 13 - shift: setInputValue(`${inputValue} `);
                        default: setInputValue(inputValue);
                    }
                }
            */
    return (
        <>
            <InputField name="first_name" regExp={validName} onErrorMessage={onInvalidNameMessage} required>Name</InputField>
            <InputField name="last_name" regExp={validName} onErrorMessage={onInvalidNameMessage} required>Last Name</InputField>
            <InputField inputType="tel" name="phone" regExp={validPhone} onErrorMessage={onInvalidPhoneMessage} required>Phone</InputField>
        </>
    )
}

export default ClientContacts;