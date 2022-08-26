import React, { useEffect, useState } from "react"
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";

type WarehouseSelectorProps = {
    warhousesData: Array<string>
    selectedShippingLine: string
}

const WarehouseSelector = (props: WarehouseSelectorProps) => {

    const { warhousesData, selectedShippingLine } = props;

    const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

    useEffect(() => setIsInputDisabled(warhousesData.length > 0 ? false : true), [warhousesData])

    return (
        <>
            <Select
                name="address_1"
                label="Address"
                onErrorMessage="Warehouse is not selected"
                placeHolder={!warhousesData.length && 'В указаном пункте нет доступных отделений'}
                dependencies={[selectedShippingLine, warhousesData]}
                isInputDisabled={(!selectedShippingLine || selectedShippingLine == 'local_pickup') || isInputDisabled}
            >
                {
                    warhousesData.length && warhousesData.map((city: string) => <SelectOption>{city}</SelectOption>)
                }
            </Select>
        </>
    )
}

export default WarehouseSelector;