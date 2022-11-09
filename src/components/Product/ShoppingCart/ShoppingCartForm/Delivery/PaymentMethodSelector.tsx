import React, { useContext } from "react"
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";
import { LangContext } from "../../../../Layouts/Layout";

type PaymentMethodSelectorProps = {
    data: any | undefined
    selectedShippingLine: string
}

type PaymentMethod = {
    title: String
    description: String
    enabled: boolean
    id: string
}

const PaymentMethodSelector = (props: PaymentMethodSelectorProps) => {

    const { language } = useContext(LangContext);
    const { PAYMENT_METHOD_SELECTOR_ERROR_MESSAGE, PAYMENT_METHOD_SELECTOR_TITLE } = require(`../../../../../languages/${language}/languages`);

    const { data, selectedShippingLine } = props;

    return (
        <Select
            name="payment_method"
            label={PAYMENT_METHOD_SELECTOR_TITLE}
            onErrorMessage={PAYMENT_METHOD_SELECTOR_ERROR_MESSAGE}
            isInputDisabled={!selectedShippingLine}
        >
            {
                data && data.map((paymentMethod: PaymentMethod, index: number) =>
                    paymentMethod.enabled && <SelectOption value={paymentMethod.id} key={index}>{paymentMethod.title}</SelectOption>
                )
            }
        </Select >
    )
}

export default PaymentMethodSelector;