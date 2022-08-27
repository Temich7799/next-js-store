import React, { useState } from "react"
import CitySelector from "./CitySelector"
import ShippingLineSelector from "./ShippingLineSelector"
import WarehouseSelector from "./WarehouseSelector"

const Delivery = () => {

    const [selectedShippingLine, setSelectedShippingLine] = useState<string>("");
    const [warhousesData, setWarhousesData] = useState<Array<string>>([]);
    const [isWarhousesDataFetching, setIsWarhousesDataFetching] = useState<boolean>(false);

    return (
        <>
            <ShippingLineSelector setSelectedShippingLine={setSelectedShippingLine} />
            <CitySelector selectedShippingLine={selectedShippingLine} setWarhousesData={setWarhousesData} setIsWarhousesDataFetching={setIsWarhousesDataFetching} />
            <WarehouseSelector selectedShippingLine={selectedShippingLine} warhousesData={warhousesData} isWarhousesDataFetching={isWarhousesDataFetching} />
        </>
    )
}

export default Delivery;