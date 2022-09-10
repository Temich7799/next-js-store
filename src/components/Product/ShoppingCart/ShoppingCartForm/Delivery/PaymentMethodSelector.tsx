import { graphql, useStaticQuery } from "gatsby";
import React from "react"
import { PAYMENT_METHOD_SELECTOR_ERROR_MESSAGE, PAYMENT_METHOD_SELECTOR_TITLE } from "../../../../../languages/ru/languages";
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";

type PaymentMethodSelectorProps = {
    selectedShippingLine: string
}

type PaymentMethod = {
    node: {
        title: String
        description: String
        enabled: boolean
        wordpress_id: string
    }
}

const PaymentMethodSelector = (props: PaymentMethodSelectorProps) => {

    const { selectedShippingLine } = props;

    const data = useStaticQuery(
        graphql`
            query getPaymentMethods {
                allWcPaymentGateways {
                    edges {
                        node {
                            title
                            description
                            enabled
                            wordpress_id
                        }
                    }
                }
            }
        `);

    function selectOnChangeHandler(onChangeEvent: any) {

    }

    return (
        <Select
            name="payment_method"
            label={PAYMENT_METHOD_SELECTOR_TITLE}
            onErrorMessage={PAYMENT_METHOD_SELECTOR_ERROR_MESSAGE}
            onChangeHandler={selectOnChangeHandler}
            isInputDisabled={!selectedShippingLine}
        >
            {
                data.allWcPaymentGateways.edges.map((edge: PaymentMethod) =>
                    edge.node.enabled && <SelectOption value={edge.node.wordpress_id}>{edge.node.title}</SelectOption>
                )
            }
        </Select >
    )
}

export default PaymentMethodSelector;