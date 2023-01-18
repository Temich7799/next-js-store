import { gql, useLazyQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react"
import Select from "../../../Form/Select/Select";
import SelectOption from "../../../Form/Select/SelectOption";
import { LangContext } from "../../../Layouts/Layout";
import { DeliveryFormContext } from "./Delivery";

const ShippingMethodSelector = () => {

    const { language } = useContext(LangContext);
    const { SHIPPING_LINE_SELECTOR_ERROR_MESSAGE, SHIPPING_LINE_SELECTOR_TITLE } = require(`../../../../languages/${language}/languages`);

    const { selectedShippingLine } = useContext(DeliveryFormContext);

    const [data, setData] = useState([]);
    const [getItems] = useLazyQuery(gql` query getAllShippingZonesMethods { ru: allWcShippingZonesMethods(zoneId: 1) { method_id method_title method_description } uk: allWcShippingZonesMethods(zoneId: 1, language: uk) { method_id method_title method_description } en: allWcShippingZonesMethods(zoneId: 1, language: en) { method_id method_title method_description } } `);
    useEffect(() => {
        getItems().then(response => {
            setData(response.data[language]);
        });
    }, []);

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
                data.length && data.map((method: any, index: number) =>
                    <SelectOption value={method.method_id} key={index}>
                        {method.method_title}
                    </SelectOption>)
            }
        </Select >
    )
}

export default ShippingMethodSelector;