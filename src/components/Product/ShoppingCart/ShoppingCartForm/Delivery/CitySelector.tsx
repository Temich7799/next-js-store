import { useLazyQuery } from "@apollo/client";
import React, { useContext, useState } from "react"
import { GET_NOVA_POSHTA_CITIES } from "../../../../../graphql/queries/nova_poshta/getNovaPoshtaCities";
import InputField from "../../../../Form/InputField";
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";
import { LangContext } from "../../../../Layouts/Layout";

type CitySelectorProps = {
    selectedShippingLine: string
    setSelectedCity: React.Dispatch<React.SetStateAction<string>>
    setWarehousesData: React.Dispatch<React.SetStateAction<string[]>>
}

const CitySelector = (props: CitySelectorProps) => {

    const { language } = useContext(LangContext);
    const { CITY_SELECTOR_ERROR_MESSAGE, CITY_SELECTOR_TITLE, CITY_SELECTOR__PLACEHOLDER } = require(`../../../../../languages/${language}/languages`);

    const { selectedShippingLine, setSelectedCity, setWarehousesData } = props;

    const [citiesData, setCitiesData] = useState<Array<object>>([]);

    const [getNovaPoshtaCities, { loading: novaPoshtaCitiesLoading }] = useLazyQuery(GET_NOVA_POSHTA_CITIES);

    const placeHolder = !citiesData.length && CITY_SELECTOR__PLACEHOLDER;

    function selectOnInputHandler(onInputEvent: any): void {

        if (onInputEvent.target.value.length > 2) {
            getNovaPoshtaCities({ variables: { params: { regExp: onInputEvent.target.value } } })
                .then((response) => { setCitiesData(response.data.allWpNovaPoshtaCities) })
        }
        else {
            setCitiesData([]);
            setSelectedCity("");
            setWarehousesData([]);
        }
    }

    function selectOnChangeHandler(onChangeEvent: any): void {
        setWarehousesData([]);
        setSelectedCity(onChangeEvent.target.value);
    }

    function resetOptionsData() {
        setCitiesData([]);
        setSelectedCity("");
        setWarehousesData([]);
    }

    return (
        <>
            {
                selectedShippingLine === 'ukrposhta_shippping'
                    ? <InputField name="city" onErrorMessage={CITY_SELECTOR_ERROR_MESSAGE} placeholder={placeHolder} required>{CITY_SELECTOR_TITLE}</InputField>
                    : <Select
                        name="city"
                        label={CITY_SELECTOR_TITLE}
                        onErrorMessage={CITY_SELECTOR_ERROR_MESSAGE}
                        placeHolder={placeHolder}
                        isInputDisabled={!selectedShippingLine || selectedShippingLine === 'local_pickup'}
                        isSelectClosed={citiesData.length > 0}
                        isFetchPending={novaPoshtaCitiesLoading}
                        resetOptionsData={resetOptionsData}
                        onChangeHandler={selectOnChangeHandler}
                        onInputHandler={selectOnInputHandler}
                        dependencies={[selectedShippingLine]}
                    >
                        {
                            citiesData.length && citiesData.map((city: object | any, index: number) =>
                                <SelectOption key={index}>
                                    {city.description_ru}
                                </SelectOption>)
                        }
                    </Select >
            }
        </>
    )
}

export default CitySelector;