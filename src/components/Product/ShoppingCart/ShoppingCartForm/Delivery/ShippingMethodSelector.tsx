import React, { useContext } from "react"
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";
import { LangContext } from "../../../../Layouts/Layout";

type ShippingMethodSelectorProps = {
    data: any | undefined
    setSelectedShippingLine: React.Dispatch<React.SetStateAction<string>>
}

const ShippingMethodSelector = (props: ShippingMethodSelectorProps) => {

    const { language } = useContext(LangContext);
    const { SHIPPING_LINE_SELECTOR_ERROR_MESSAGE, SHIPPING_LINE_SELECTOR_TITLE } = require(`../../../../../languages/${language}/languages`);

    const { data, setSelectedShippingLine } = props;

    function selectOnChangeHandler(onChangeEvent: any) {
        setSelectedShippingLine(onChangeEvent.target.value);
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