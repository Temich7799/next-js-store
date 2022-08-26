import React from "react"
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";

type WarehouseSelectorProps = {
    warhousesData: Array<string>
    selectedShippingLine: string
}

const WarehouseSelector = (props: WarehouseSelectorProps) => {

    const { warhousesData, selectedShippingLine } = props;

    return (
        <>
            <Select
                name="address_1"
                label="Address"
                onErrorMessage="Warehouse is not selected"
                dependencies={[selectedShippingLine, warhousesData]}
                isInputDisabled={!selectedShippingLine || selectedShippingLine == 'local_pickup'}
            >
                {
                    warhousesData.map((city: string) => <SelectOption>{city}</SelectOption>)
                }
            </Select>
        </>
    )
}

export default WarehouseSelector;