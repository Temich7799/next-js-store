import React, { useState } from "react"
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
            <WarehouseSelector selectedShippingLine={selectedShippingLine} warhousesData={warhousesData} />
        </>
    )
}

export default Delivery;