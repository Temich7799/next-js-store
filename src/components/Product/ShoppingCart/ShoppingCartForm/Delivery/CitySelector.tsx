import React, { useState } from "react"
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";

type CitySelectorProps = {
    setWarhousesData: React.Dispatch<React.SetStateAction<string[]>>
    selectedShippingLine: string
}

const CitySelector = (props: CitySelectorProps) => {

    const { setWarhousesData, selectedShippingLine } = props;
    const [citiesData, setCitiesData] = useState<Array<string>>([]);

    function selectOnInputHandler(onInputEvent: any) {
        if (onInputEvent.target.value.length > 1) {
            fetch(`http://localhost:3000/cities?shippingZoneMethod=${selectedShippingLine}&city=${onInputEvent.target.value}`, { mode: 'cors', })
                .then(responce => responce && responce.json())
                .then(responceData => setCitiesData(responceData));
        }
        else {
            setCitiesData([]);
            setWarhousesData([]);
        }
    }

    function resetOptionsData() {
        setCitiesData([]);
        setWarhousesData([])
    }

    function onChangeHandler(onChangeEvent: any) {
        fetch(`http://localhost:3000/warehouses?shippingZoneMethod=${selectedShippingLine}&city=${onChangeEvent.target.value}`, { mode: 'cors', })
            .then(responce => responce && responce.json())
            .then(responceData => setWarhousesData(responceData));
    }

    return (
        <Select
            name="city"
            label="City"
            onErrorMessage="Please, choose a City from list"
            onChangeHandlerProps={onChangeHandler}
            onInputHandler={selectOnInputHandler}
            isInputBlocked={false}
            resetInputOnDep={[selectedShippingLine]}
            resetOptionsData={resetOptionsData}
        >
            {
                citiesData.map((city) => <SelectOption>{city}</SelectOption>)
            }
        </Select>
    )
}

export default CitySelector;