import React, { useContext } from "react"
import { useShippingMethods } from "../../../../services/hooks/gatsby/useShippingMethods";
import Select from "../../../Form/Select/Select";
import SelectOption from "../../../Form/Select/SelectOption";
import { LangContext } from "../../../Layouts/Layout";
import { DeliveryFormContext } from "./Delivery";

const ShippingMethodSelector = () => {

    const { language } = useContext(LangContext);
    const { SHIPPING_LINE_SELECTOR_ERROR_MESSAGE, SHIPPING_LINE_SELECTOR_TITLE } = require(`../../../../languages/${language}/languages`);

    const { selectedShippingLine } = useContext(DeliveryFormContext);

    const data = useShippingMethods(language);

    function selectOnChangeHandler(onChangeEvent: any): void {
        selectedShippingLine.set(onChangeEvent.target.value);
    }

    return (
        <Select
            name="method_title"
            label={SHIPPING_LINE_SELECTOR_TITLE}
            onErrorMessage={SHIPPING_LINE_SELECTOR_ERROR_MESSAGE}
            onChangeHandler={selectOnChangeHandler}
        >
            {
                data && data.map((method: any, index: number) =>
                    <SelectOption value={method.method_id} key={index}>
                        {method.method_title}
                    </SelectOption>)
            }
        </Select >
    )
}

export default ShippingMethodSelector;