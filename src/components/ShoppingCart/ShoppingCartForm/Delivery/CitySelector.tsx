import { useLazyQuery } from "@apollo/client";
import React, { useContext, useState } from "react"
import { GET_NOVA_POSHTA_CITIES } from "../../../apollo/gql/getAllNovaPoshtaCities";
import InputField from "../../../Form/InputField";
import Select from "../../../Form/Select/Select";
import SelectOption from "../../../Form/Select/SelectOption";
import { LangContext } from "../../../Layouts/Layout";
import { DeliveryFormContext } from "./Delivery";

const CitySelector = () => {

    const { language } = useContext(LangContext);
    const { CITY_SELECTOR_ERROR_MESSAGE, CITY_SELECTOR_TITLE, CITY_SELECTOR__PLACEHOLDER } = require(`../../../../languages/${language}/languages`);

    const { selectedShippingLine, selectedCity, warehousesData } = useContext(DeliveryFormContext);

    const [citiesData, setCitiesData] = useState<Array<object>>([]);

    const [getNovaPoshtaCities, { loading: novaPoshtaCitiesLoading }] = useLazyQuery(GET_NOVA_POSHTA_CITIES);

    const placeHolder = !citiesData.length && CITY_SELECTOR__PLACEHOLDER;

    function selectOnInputHandler(onInputEvent: any): void {

        if (onInputEvent.target.value.length > 2) {
            getNovaPoshtaCities({ variables: { params: { CityName: onInputEvent.target.value } } })
                .then((response) => { setCitiesData(response.data.allNovaPoshtaCities) })
        }
        else {
            setCitiesData([]);
            selectedCity.set("");
            resetWarehousesData()
        }
    }

    function selectOnChangeHandler(onChangeEvent: any): void {
        resetWarehousesData();
        selectedCity.set(onChangeEvent.target.value.cityName);
        warehousesData.set({ SettlementRef: onChangeEvent.target.value.cityRef, data: [] });
    }

    function resetOptionsData(): void {
        setCitiesData([]);
        selectedCity.set("");
        resetWarehousesData()
    }

    function resetWarehousesData(): void {
        warehousesData.set({ SettlementRef: '', data: [] });
    }

    return (
        <>
            {
                selectedShippingLine.get === 'ukrposhta_shippping'
                    ? <InputField name="city" onErrorMessage={CITY_SELECTOR_ERROR_MESSAGE} placeholder={placeHolder} required>{CITY_SELECTOR_TITLE}</InputField>
                    : <Select
                        name="city"
                        label={CITY_SELECTOR_TITLE}
                        onErrorMessage={CITY_SELECTOR_ERROR_MESSAGE}
                        placeHolder={placeHolder}
                        isInputDisabled={!selectedShippingLine.get || selectedShippingLine.get === 'local_pickup'}
                        isSelectClosed={citiesData.length > 0}
                        isFetchPending={novaPoshtaCitiesLoading}
                        resetOptionsData={resetOptionsData}
                        onChangeHandler={selectOnChangeHandler}
                        onInputHandler={selectOnInputHandler}
                        dependencies={[selectedShippingLine.get]}
                    >
                        {
                            citiesData.length && citiesData.map((city: object | any, index: number) =>
                                <SelectOption value={{ cityName: city.Present, cityRef: city.Ref }} key={index}>
                                    {city.Present}
                                </SelectOption>)
                        }
                    </Select >
            }
        </>
    )
}

export default CitySelector;