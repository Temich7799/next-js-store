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

    const [isFetchPending, setIsFetchPending] = useState<boolean>(false);

    function selectOnInputHandler(onInputEvent: any) {
        if (onInputEvent.target.value.length > 1) {
            setIsFetchPending(true);
            fetch(`http://localhost:3000/cities?shippingZoneMethod=${selectedShippingLine}&city=${onInputEvent.target.value}`, { mode: 'cors', })
                .then(responce => responce && responce.json())
                .then(responceData => setCitiesData(responceData))
                .finally(() => setIsFetchPending(false))
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
            placeHolder={!citiesData.length && 'Начинайте вводить название города'}
            isInputBlocked={false}
            isInputDisabled={!selectedShippingLine || selectedShippingLine == 'local_pickup'}
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