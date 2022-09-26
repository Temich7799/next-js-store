import { gql, useQuery } from "@apollo/client";
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

    const { data } = useQuery(gql`
            query getAllShippingZonesMethods($zoneId: Int) {
                allWpShippingZonesMethods(zoneId: $zoneId) {
                    method_id
                    method_title
                    method_description
                }
            }
        `, { variables: { zoneId: 1 } });

    return (
        <Select
            name="method_title"
            label={SHIPPING_LINE_SELECTOR_TITLE}
            onErrorMessage={SHIPPING_LINE_SELECTOR_ERROR_MESSAGE}
            onChangeHandler={selectOnChangeHandler}
        >
            {
                data && data.allWpShippingZonesMethods.map((method: any, index: number) =>
                    <SelectOption value={method.method_id} key={index}>
                        {method.method_title}
                    </SelectOption>)
            }
        </Select >
    )
}

export default ShippingLineSelector;