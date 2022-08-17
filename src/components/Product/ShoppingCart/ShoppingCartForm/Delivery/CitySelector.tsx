import React, { useEffect, useRef, useState } from "react"
import AutocompleteInput from "../../../../AutocompleteInput";

type CitySelectorProps = {
    setWarhousesData: React.Dispatch<React.SetStateAction<string[]>>
    selectedShippingLine: string
}

const CitySelector = (props: CitySelectorProps) => {

    const { setWarhousesData, selectedShippingLine } = props;
    const [citiesData, setCitiesData] = useState<Array<string>>([]);

    const citySelectorInput = useRef<any>();

    useEffect(() => cleanInput(), [selectedShippingLine]);

    function cleanInput(): void {
        citySelectorInput.current.value = "";
    }

    function getCitiesData(inputValue: string) {
        inputValue.length > 1
            ? fetch(`http://localhost:3000/cities?shippingZoneMethod=${selectedShippingLine}&city=${inputValue}`, { mode: 'cors', })
                .then(responce => responce && responce.json())
                .then(responceData => setCitiesData(responceData))
            : setCitiesData([]);
    }

    function getWarhousesData(selectedCity: string) {
        fetch(`http://localhost:3000/warehouses?shippingZoneMethod=${selectedShippingLine}&city=${selectedCity}`, { mode: 'cors', })
            .then(responce => responce && responce.json())
            .then(responceData => setWarhousesData(responceData));
    }

    return (
        <AutocompleteInput
            ref={citySelectorInput}
            name="city"
            placeholder="Начинайте вводить название города"
            data={citiesData}
            onInputHandler={getCitiesData}
            onChangeHandler={getWarhousesData}
        />
    )
}

export default CitySelector;