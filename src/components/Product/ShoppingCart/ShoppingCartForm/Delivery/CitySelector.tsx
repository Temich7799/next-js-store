import React, { useEffect, useRef, useState } from "react"
import AutocompleteInput from "../../../../AutocompleteInput";
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";

type CitySelectorProps = {
    setWarhousesData: React.Dispatch<React.SetStateAction<string[]>>
    selectedShippingLine: string
}

const CitySelector = (props: CitySelectorProps) => {

    const { setWarhousesData, selectedShippingLine } = props;
    const [citiesData, setCitiesData] = useState<Array<string>>([]);

    const selectInput = useRef<any>();
    useEffect(() => cleanInput(), [selectedShippingLine]);

    function cleanInput(): void {
        selectInput.current.value = "";
    }

    function selectOnInputHandler(onInputEvent: any) {
        onInputEvent.target.value.length > 1
            ? fetch(`http://localhost:3000/cities?shippingZoneMethod=${selectedShippingLine}&city=${onInputEvent.target.value}`, { mode: 'cors', })
                .then(responce => responce && responce.json())
                .then(responceData => setCitiesData(responceData))
            : setCitiesData([]);
    }

    function onChangeHandler(onChangeEvent: any) {
        fetch(`http://localhost:3000/warehouses?shippingZoneMethod=${selectedShippingLine}&city=${onChangeEvent.target.value}`, { mode: 'cors', })
            .then(responce => responce && responce.json())
            .then(responceData => setWarhousesData(responceData));
    }

    return (
        <Select
            ref={selectInput}
            name="city"
            label="City"
            onErrorMessage="Please, choose a City from list"
            onChangeHandlerProps={onChangeHandler}
            onInputHandler={selectOnInputHandler}
            isInputBlocked={false}
        >
            {
                citiesData.map((city) => <SelectOption>{city}</SelectOption>)
            }
        </Select>
    )
}

export default CitySelector;