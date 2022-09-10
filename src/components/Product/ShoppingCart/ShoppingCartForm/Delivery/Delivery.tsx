import React, { useState } from "react"
import CitySelector from "./CitySelector"
import PaymentMethodSelector from "./PaymentMethodSelector"
import ShippingLineSelector from "./ShippingLineSelector"
import WarehouseSelector from "./WarehouseSelector"

const Delivery = () => {

    const [selectedShippingLine, setSelectedShippingLine] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [warehousesData, setWarehousesData] = useState<Array<string>>([]);

    return (
        <>
            <ShippingLineSelector setSelectedShippingLine={setSelectedShippingLine} />
            <PaymentMethodSelector selectedShippingLine={selectedShippingLine} />
            <CitySelector selectedShippingLine={selectedShippingLine} setSelectedCity={setSelectedCity} setWarehousesData={setWarehousesData} />
            <WarehouseSelector selectedShippingLine={selectedShippingLine} selectedCity={selectedCity} warehousesData={warehousesData} setWarehousesData={setWarehousesData} />
        </>
    )
}

export default Delivery;