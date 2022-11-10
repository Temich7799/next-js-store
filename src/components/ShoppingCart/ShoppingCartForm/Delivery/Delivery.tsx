import React, { useContext, useState } from "react"
import { usePaymentMethods } from "../../../../services/hooks/graphql/usePaymentMethods"
import { useShippingMethods } from "../../../../services/hooks/gatsby/useShippingMethods"
import { LangContext } from "../../../Layouts/Layout"
import CitySelector from "./CitySelector"
import PaymentMethodSelector from "./PaymentMethodSelector"
import ShippingMethodSelector from "./ShippingMethodSelector"
import WarehouseSelector from "./WarehouseSelector"

const Delivery = () => {

    const { language } = useContext(LangContext);

    const [selectedShippingLine, setSelectedShippingLine] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [warehousesData, setWarehousesData] = useState<Array<string>>([]);

    const shippingMethodsData = useShippingMethods(language);
    const { data: paymentMethodsData } = usePaymentMethods(language);

    return (
        <>
            <ShippingMethodSelector data={shippingMethodsData} setSelectedShippingLine={setSelectedShippingLine} />
            <PaymentMethodSelector data={paymentMethodsData} selectedShippingLine={selectedShippingLine} />
            <CitySelector selectedShippingLine={selectedShippingLine} setSelectedCity={setSelectedCity} setWarehousesData={setWarehousesData} />
            <WarehouseSelector selectedShippingLine={selectedShippingLine} selectedCity={selectedCity} warehousesData={warehousesData} setWarehousesData={setWarehousesData} />
        </>
    )
}

export default Delivery;