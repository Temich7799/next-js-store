import { graphql, useStaticQuery } from "gatsby";
import React from "react"
import { SHIPPING_LINE_SELECTOR_ERROR_MESSAGE, SHIPPING_LINE_SELECTOR_TITLE } from "../../../../../languages/ru/languages";
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";

type ShippingLineSelectorProps = {
    setSelectedShippingLine: React.Dispatch<React.SetStateAction<string>>
}

const ShippingLineSelector = (props: ShippingLineSelectorProps) => {

    const { setSelectedShippingLine } = props;

    function selectOnChangeHandler(onChangeEvent: any) {
        setSelectedShippingLine(onChangeEvent.target.value);
    }

    const shippingZonesMethods = useStaticQuery(
        graphql`
            query getAllShippingZonesMethods {
                allWcShippingZones3Methods(filter: {enabled: {eq: true}}) {
                    edges {
                        node {
                            instance_id
                            method_id
                            method_title
                            method_description
                        }
                    }
                }
            }
        `
    );

    return (
        <Select
            name="method_title"
            label={SHIPPING_LINE_SELECTOR_TITLE}
            onErrorMessage={SHIPPING_LINE_SELECTOR_ERROR_MESSAGE}
            onChangeHandler={selectOnChangeHandler}
        >
            {
                shippingZonesMethods.allWcShippingZones3Methods.edges.map((method: any, index: number) =>
                    <SelectOption value={method.node.method_id} key={index}>
                        {method.node.method_title}
                    </SelectOption>)
            }
        </Select >
    )
}

export default ShippingLineSelector;