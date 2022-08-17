import React, { useState } from "react"
import InputField from "../../../../Form/InputField"
import CitySelector from "./CitySelector"
import ShippingLineSelector from "./ShippingLineSelector"
import WarehouseSelector from "./WarehouseSelector"

const Delivery = () => {

    const [selectedShippingLine, setSelectedShippingLine] = useState<string>("");
    const [warhousesData, setWarhousesData] = useState<Array<string>>([]);

    return (
        <>
            <ShippingLineSelector setSelectedShippingLine={setSelectedShippingLine} />
            <CitySelector selectedShippingLine={selectedShippingLine} setWarhousesData={setWarhousesData} />
            <WarehouseSelector warhousesData={warhousesData} />
        </>
    )
}

export default Delivery;