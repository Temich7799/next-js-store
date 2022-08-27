import React, { useEffect, useState } from "react"
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";

type WarehouseSelectorProps = {
    selectedShippingLine: string
    warhousesData: Array<string>
    isWarhousesDataFetching: boolean
}

const WarehouseSelector = (props: WarehouseSelectorProps) => {

    const { selectedShippingLine, warhousesData, isWarhousesDataFetching } = props;

    const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

    useEffect(() => setIsInputDisabled(warhousesData.length > 0 ? false : true), [warhousesData])

    return (
        <>
            <Select
                name="address_1"
                label="Address"
                onErrorMessage="Warehouse is not selected"
                placeHolder={!isWarhousesDataFetching && !warhousesData.length && 'В указаном пункте нет доступных отделений'}
                isInputDisabled={(!selectedShippingLine || selectedShippingLine == 'local_pickup') || isInputDisabled || isWarhousesDataFetching}
                isFetchPending={isWarhousesDataFetching}
                dependencies={[selectedShippingLine, warhousesData]}
            >
                {
                    warhousesData.length && warhousesData.map((city: string) => <SelectOption>{city}</SelectOption>)
                }
            </Select>
        </>
    )
}

export default WarehouseSelector;