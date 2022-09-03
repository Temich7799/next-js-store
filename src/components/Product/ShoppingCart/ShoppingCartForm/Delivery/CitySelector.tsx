import React, { useState } from "react"
import { CITY_SELECTOR_ERROR_MESSAGE, CITY_SELECTOR__PLACEHOLDER } from "../../../../../languages/ru/languages";
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";

type CitySelectorProps = {
    selectedShippingLine: string
    setWarhousesData: React.Dispatch<React.SetStateAction<string[]>>
    setIsWarhousesDataFetching: React.Dispatch<React.SetStateAction<boolean>>
}

const CitySelector = (props: CitySelectorProps) => {

    const { selectedShippingLine, setWarhousesData, setIsWarhousesDataFetching } = props;
    const [citiesData, setCitiesData] = useState<Array<string>>([]);

    const [isFetchPending, setIsFetchPending] = useState<boolean>(false);

    function selectOnInputHandler(onInputEvent: any) {
        if (onInputEvent.target.value.length > 2) {
            setIsFetchPending(true);
            fetch(`http://localhost:3000/cities?shippingZoneMethod=${selectedShippingLine}&city=${onInputEvent.target.value}`, { mode: 'cors', })
                .then(responce => responce && responce.json())
                .then(responceData => setCitiesData(responceData))
                .finally(() => setIsFetchPending(false))
        }
        else {
            setCitiesData([]);
            setIsFetchPending(false);
            setWarhousesData([]);
        }
    }

    function resetOptionsData() {
        setCitiesData([]);
        setWarhousesData([])
    }

    function onChangeHandler(onChangeEvent: any) {
        setIsWarhousesDataFetching(true);
        fetch(`http://localhost:3000/warehouses?shippingZoneMethod=${selectedShippingLine}&city=${onChangeEvent.target.value}`, { mode: 'cors', })
            .then(responce => responce && responce.json())
            .then(responceData => setWarhousesData(responceData))
            .finally(() => setIsWarhousesDataFetching(false));
    }

    return (
        <Select
            name="city"
            label="City"
            onErrorMessage={CITY_SELECTOR_ERROR_MESSAGE}
            placeHolder={!citiesData.length && CITY_SELECTOR__PLACEHOLDER}
            isInputBlocked={false}
            isInputDisabled={!selectedShippingLine || selectedShippingLine == 'local_pickup'}
            isSelectClosed={citiesData.length > 0}
            isFetchPending={isFetchPending}
            resetOptionsData={resetOptionsData}
            onChangeHandlerProps={onChangeHandler}
            onInputHandler={selectOnInputHandler}
            dependencies={[selectedShippingLine]}
        >
            {
                citiesData.length && citiesData.map((city: string) => <SelectOption>{city}</SelectOption>)
            }
        </Select >
    )
}

export default CitySelector;