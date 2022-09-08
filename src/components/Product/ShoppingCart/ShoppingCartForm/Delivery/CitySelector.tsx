import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react"
import { GET_NOVA_POSHTA_CITIES } from "../../../../../graphql/queries/getNovaPoshtaCities";
import { GET_NOVA_POSHTA_CITY_REF } from "../../../../../graphql/queries/getNovaPoshtaCityRef";
import { GET_NOVA_POSHTA_WAREHOUSES } from "../../../../../graphql/queries/getNovaPoshtaWarehouses";
import { CITY_SELECTOR_ERROR_MESSAGE, CITY_SELECTOR_TITLE, CITY_SELECTOR__PLACEHOLDER } from "../../../../../languages/ru/languages";
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";

type CitySelectorProps = {
    selectedShippingLine: string
    setWarhousesData: React.Dispatch<React.SetStateAction<string[]>>
    setIsWarhousesDataFetching: React.Dispatch<React.SetStateAction<boolean>>
}

const CitySelector = (props: CitySelectorProps) => {

    const { selectedShippingLine, setWarhousesData, setIsWarhousesDataFetching } = props;
    const [citiesData, setCitiesData] = useState<Array<object>>([]);

    const [getNovaPoshtaCities, { loading: novaPoshtaCitiesLoading }] = useLazyQuery(GET_NOVA_POSHTA_CITIES);
    const [getNovaPoshtaCityRef] = useLazyQuery(GET_NOVA_POSHTA_CITY_REF);
    const [getNovaPoshtaWarehouses] = useLazyQuery(GET_NOVA_POSHTA_WAREHOUSES);


    function selectOnInputHandler(onInputEvent: any) {

        if (onInputEvent.target.value.length > 2) {
            getNovaPoshtaCities({ variables: { regExp: onInputEvent.target.value } })
                .then((response) => { setCitiesData(response.data.allWpNovaPoshtaCities) })
        }
        else {
            setCitiesData([]);
            setWarhousesData([]);
        }
    }

    function onChangeHandler(onChangeEvent: any) {

        getNovaPoshtaCityRef({ variables: { regExp: onChangeEvent.target.value } })
            .then((response) => {
                setIsWarhousesDataFetching(true);
                getNovaPoshtaWarehouses({ variables: { cityRef: response.data.allWpNovaPoshtaCities[0].ref } })
                    .then((response) => {
                        setWarhousesData(response.data.allWpNovaPoshtaWarehouses);
                    })
                    .finally(() => {
                        setIsWarhousesDataFetching(false);
                    });
            });
    }

    function resetOptionsData() {
        setCitiesData([]);
        setWarhousesData([])
    }

    return (
        <Select
            name="city"
            label={CITY_SELECTOR_TITLE}
            onErrorMessage={CITY_SELECTOR_ERROR_MESSAGE}
            placeHolder={!citiesData.length && CITY_SELECTOR__PLACEHOLDER}
            isInputBlocked={false}
            isInputDisabled={!selectedShippingLine || selectedShippingLine == 'local_pickup'}
            isSelectClosed={citiesData.length > 0}
            isFetchPending={novaPoshtaCitiesLoading}
            resetOptionsData={resetOptionsData}
            onChangeHandlerProps={onChangeHandler}
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
    )
}

export default CitySelector;