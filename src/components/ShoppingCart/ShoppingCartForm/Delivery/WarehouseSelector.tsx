import { useLazyQuery } from "@apollo/client";
import React, { useContext } from "react"
import { GET_NOVA_POSHTA_WAREHOUSES } from "../../../apollo/gql/getAllNovaPoshtaWarehouses";
import InputField from "../../../Form/InputField";
import Select from "../../../Form/Select/Select";
import SelectOption from "../../../Form/Select/SelectOption";
import { LangContext } from "../../../Layouts/Layout";
import { DeliveryFormContext } from "./Delivery";

const WarehouseSelector = () => {

    const { language } = useContext(LangContext);
    const { WAREHOUSE_SELECTOR_ERROR_MESSAGE, WAREHOUSE_SELECTOR_PLACEHOLDER, WAREHOUSE_SELECTOR_TITLE } = require(`../../../../languages/${language}/languages`);

    const { selectedShippingLine, selectedCity, warehousesData } = useContext(DeliveryFormContext);

    const [getNovaPoshtaWarehouses, { loading: novaPoshtaWarehousesLoading }] = useLazyQuery(GET_NOVA_POSHTA_WAREHOUSES);

    const placeHolder = !warehousesData.get.data.length && WAREHOUSE_SELECTOR_PLACEHOLDER;

    function selectOnInputHandler(onInputEvent: any): void {

        if (onInputEvent.target.value.length > 0) {

            getNovaPoshtaWarehouses({
                variables: {
                    params: {
                        SettlementRef: warehousesData.get.SettlementRef,
                        FindByString: onInputEvent.target.value,
                    }
                }
            })
                .then((response) => {
                    warehousesData.set({
                        ...warehousesData.get,
                        data: response.data.allNovaPoshtaWarehouses
                    });
                });

        }
        else {
            resetWarehousesData();
        }
    }

    function resetWarehousesData(): void {
        warehousesData.set({ SettlementRef: warehousesData.get.SettlementRef, data: [] });
    }

    return (
        <>
            {
                selectedShippingLine.get === 'ukrposhta_shippping'
                    ? <InputField name="address_1" onErrorMessage={WAREHOUSE_SELECTOR_ERROR_MESSAGE} placeholder={placeHolder} required>{WAREHOUSE_SELECTOR_TITLE}</InputField>
                    : <Select
                        name="address_1"
                        label={WAREHOUSE_SELECTOR_TITLE}
                        onErrorMessage={WAREHOUSE_SELECTOR_ERROR_MESSAGE}
                        placeHolder={placeHolder}
                        isInputDisabled={(!selectedShippingLine.get || selectedShippingLine.get == 'local_pickup') || !selectedCity.get}
                        isSelectClosed={warehousesData.get.data.length > 0}
                        isFetchPending={novaPoshtaWarehousesLoading}
                        onInputHandler={selectOnInputHandler}
                        dependencies={[selectedShippingLine.get, warehousesData.get]}
                    >
                        {
                            warehousesData.get.data.length && warehousesData.get.data.map((warehouse: object | any, index: number) =>
                                <SelectOption key={index}>
                                    {warehouse.Description}
                                </SelectOption>)
                        }
                    </Select>
            }
        </>
    )
}

export default WarehouseSelector;