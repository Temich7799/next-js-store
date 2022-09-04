import React, { useEffect, useState } from "react"
import { WAREHOUSE_SELECTOR_ERROR_MESSAGE, WAREHOUSE_SELECTOR_PLACEHOLDER, WAREHOUSE_SELECTOR_TITLE } from "../../../../../languages/ru/languages";
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
                label={WAREHOUSE_SELECTOR_TITLE}
                onErrorMessage={WAREHOUSE_SELECTOR_ERROR_MESSAGE}
                placeHolder={!isWarhousesDataFetching && !warhousesData.length && WAREHOUSE_SELECTOR_PLACEHOLDER}
                isInputDisabled={(!selectedShippingLine || selectedShippingLine == 'local_pickup') || isInputDisabled || isWarhousesDataFetching}
                isSelectClosed={isWarhousesDataFetching}
                isFetchPending={isWarhousesDataFetching}
                dependencies={[selectedShippingLine, warhousesData]}
            >
                {
                    warhousesData.length && warhousesData.map((city: string, index: number) =>
                        <SelectOption key={index}>
                            {city}
                        </SelectOption>)
                }
            </Select>
        </>
    )
}

export default WarehouseSelector;