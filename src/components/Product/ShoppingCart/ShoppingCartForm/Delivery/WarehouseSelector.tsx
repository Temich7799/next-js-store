import { useLazyQuery } from "@apollo/client";
import React from "react"
import { GET_NOVA_POSHTA_CITY_REF } from "../../../../../graphql/queries/getNovaPoshtaCityRef";
import { GET_NOVA_POSHTA_WAREHOUSES } from "../../../../../graphql/queries/getNovaPoshtaWarehouses";
import { WAREHOUSE_SELECTOR_ERROR_MESSAGE, WAREHOUSE_SELECTOR_PLACEHOLDER, WAREHOUSE_SELECTOR_TITLE } from "../../../../../languages/ru/languages";
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";

type WarehouseSelectorProps = {
    selectedShippingLine: string
    selectedCity: string
    warehousesData: Array<string>
    setWarehousesData: React.Dispatch<React.SetStateAction<string[]>>
}

const WarehouseSelector = (props: WarehouseSelectorProps) => {

    const { selectedShippingLine, selectedCity, warehousesData, setWarehousesData } = props;

    const [getNovaPoshtaCityRef] = useLazyQuery(GET_NOVA_POSHTA_CITY_REF);
    const [getNovaPoshtaWarehouses, { loading: novaPoshtaWarehousesLoading }] = useLazyQuery(GET_NOVA_POSHTA_WAREHOUSES);

    function selectOnInputHandler(onInputEvent: any) {

        if (onInputEvent.target.value.length > 0) {

            getNovaPoshtaCityRef({ variables: { regExp: selectedCity } })
                .then((response) => {
                    getNovaPoshtaWarehouses({ variables: { cityRef: response.data.allWpNovaPoshtaCities[0].ref, regExp: onInputEvent.target.value } })
                        .then((response) => {
                            setWarehousesData(response.data.allWpNovaPoshtaWarehouses);
                        });
                });
        }
        else {
            setWarehousesData([]);
        }
    }

    return (
        <Select
            name="address_1"
            label={WAREHOUSE_SELECTOR_TITLE}
            onErrorMessage={WAREHOUSE_SELECTOR_ERROR_MESSAGE}
            placeHolder={!warehousesData.length && WAREHOUSE_SELECTOR_PLACEHOLDER}
            isInputDisabled={(!selectedShippingLine || selectedShippingLine == 'local_pickup') || !selectedCity}
            isSelectClosed={warehousesData.length > 0}
            isFetchPending={novaPoshtaWarehousesLoading}
            onInputHandler={selectOnInputHandler}
            dependencies={[selectedShippingLine, warehousesData]}
        >
            {
                warehousesData.length && warehousesData.map((city: object | any, index: number) =>
                    <SelectOption key={index}>
                        {city.description_ru}
                    </SelectOption>)
            }
        </Select>
    )
}

export default WarehouseSelector;