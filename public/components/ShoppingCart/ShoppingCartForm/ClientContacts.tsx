import React, { useContext } from "react"
import InputField from "../../Form/InputField";
import { PageContext } from "../../Layouts/Layout";

const ClientContacts = () => {

    const { language } = useContext(PageContext);
    const {
        CLIENT_CONTACTS_LAST_NAME_TITLE,
        CLIENT_CONTACTS_NAME_ERROR_MESSAGE,
        CLIENT_CONTACTS_NAME_TITLE,
        CLIENT_CONTACTS_PHONE_ERROR_MESSAGE,
        CLIENT_CONTACTS_PHONE_TITLE } = require(`../../../languages/${language}/languages`);

    const validName = /[А-я]/;

    const validPhone = /[0-9]/;

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
            <InputField name="first_name" regExp={validName} onErrorMessage={CLIENT_CONTACTS_NAME_ERROR_MESSAGE} required>{CLIENT_CONTACTS_NAME_TITLE}</InputField>
            <InputField name="last_name" regExp={validName} onErrorMessage={CLIENT_CONTACTS_NAME_ERROR_MESSAGE} required>{CLIENT_CONTACTS_LAST_NAME_TITLE}</InputField>
            <InputField inputType="tel" name="phone" regExp={validPhone} onErrorMessage={CLIENT_CONTACTS_PHONE_ERROR_MESSAGE} required>{CLIENT_CONTACTS_PHONE_TITLE}</InputField>
        </>
    )
}

export default ClientContacts;