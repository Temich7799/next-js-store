import { gql, useQuery } from "@apollo/client";
import React from "react"
import { PAYMENT_METHOD_SELECTOR_ERROR_MESSAGE, PAYMENT_METHOD_SELECTOR_TITLE } from "../../../../../languages/ru/languages";
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";

type PaymentMethodSelectorProps = {
    selectedShippingLine: string
}

type PaymentMethod = {
    title: String
    description: String
    enabled: boolean
    id: string
}

const PaymentMethodSelector = (props: PaymentMethodSelectorProps) => {

    const { selectedShippingLine } = props;

    const { data } = useQuery(gql`
            query getAllPaymentMethods {
                allWpWcPaymentMethods {
                    title
                    description
                    enabled
                    id
                }
            }
        `);

    return (
        <Select
            name="payment_method"
            label={PAYMENT_METHOD_SELECTOR_TITLE}
            onErrorMessage={PAYMENT_METHOD_SELECTOR_ERROR_MESSAGE}
            isInputDisabled={!selectedShippingLine}
        >
            {
                data && data.allWpWcPaymentMethods.map((paymentMethod: PaymentMethod) =>
                    paymentMethod.enabled && <SelectOption value={paymentMethod.id}>{paymentMethod.title}</SelectOption>
                )
            }
        </Select >
    )
}

export default PaymentMethodSelector;