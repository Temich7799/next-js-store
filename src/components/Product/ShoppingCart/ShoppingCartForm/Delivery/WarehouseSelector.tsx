import React, { useEffect, useRef, useState } from "react"
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";

type WarehouseSelectorProps = {
    warhousesData: Array<string>
}

const WarehouseSelector = (props: WarehouseSelectorProps) => {

    const { warhousesData } = props;

    const warhouseSelectorInput = useRef<any>();

    useEffect(() => cleanInput(), [warhousesData]);

    function cleanInput(): void { warhouseSelectorInput.current.value = "" }

    return (
        <>
            <Select ref={warhouseSelectorInput} name="address_1" label="Address" onErrorMessage="Warehouse is not selected">
                {
                    warhousesData.map((city: string) => <SelectOption>{city}</SelectOption>)
                }
            </Select>
        </>
    )
}

export default WarehouseSelector;