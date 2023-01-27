import React, { createContext, useState } from "react"
import { WarehousesData } from "../../../../types/WarehousesDataType"
import CitySelector from "./CitySelector"
import PaymentMethodSelector from "./PaymentMethodSelector"
import ShippingMethodSelector from "./ShippingMethodSelector"
import WarehouseSelector from "./WarehouseSelector"


type DeliveryFormContextType = {
    selectedShippingLine: {
        get: string;
        set: React.Dispatch<React.SetStateAction<string>>;
    };
    selectedCity: {
        get: string;
        set: React.Dispatch<React.SetStateAction<string>>;
    };
    warehousesData: {
        get: WarehousesData;
        set: React.Dispatch<React.SetStateAction<WarehousesData>>;
    };
}

const Delivery = () => {

    const [selectedShippingLine, setSelectedShippingLine] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [warehousesData, setWarehousesData] = useState<WarehousesData>({ SettlementRef: '', data: [] });

    const contextValue = {
        selectedShippingLine: {
            get: selectedShippingLine,
            set: setSelectedShippingLine,
        },
        selectedCity: {
            get: selectedCity,
            set: setSelectedCity,
        },
        warehousesData: {
            get: warehousesData,
            set: setWarehousesData,
        }
    };

    return (
        <DeliveryFormContext.Provider value={contextValue}>
            <ShippingMethodSelector />
            <PaymentMethodSelector />
            <CitySelector />
            <WarehouseSelector />
        </DeliveryFormContext.Provider>
    )
}

export default Delivery;

export const DeliveryFormContext = createContext<DeliveryFormContextType>({
    selectedShippingLine: {
        get: "",
        set: function (value: React.SetStateAction<string>): void {
            throw new Error("Function not implemented.")
        }
    },
    selectedCity: {
        get: "",
        set: function (value: React.SetStateAction<string>): void {
            throw new Error("Function not implemented.")
        }
    },
    warehousesData: {
        get: {
            SettlementRef: "",
            data: []
        },
        set: function (value: React.SetStateAction<WarehousesData>): void {
            throw new Error("Function not implemented.")
        }
    }
});