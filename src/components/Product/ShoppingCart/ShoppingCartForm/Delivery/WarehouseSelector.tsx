import { useLazyQuery } from "@apollo/client";
import React, { useContext } from "react"
import { GET_NOVA_POSHTA_CITY_REF } from "../../../../../graphql/queries/nova_poshta/getNovaPoshtaCityRef";
import { GET_NOVA_POSHTA_WAREHOUSES } from "../../../../../graphql/queries/nova_poshta/getNovaPoshtaWarehouses";
import InputField from "../../../../Form/InputField";
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";
import { LangContext } from "../../../../Layouts/Layout";

type WarehouseSelectorProps = {
    selectedShippingLine: string
    selectedCity: string
    warehousesData: Array<string>
    setWarehousesData: React.Dispatch<React.SetStateAction<string[]>>
}

const WarehouseSelector = (props: WarehouseSelectorProps) => {

    const { language } = useContext(LangContext);
    const { WAREHOUSE_SELECTOR_ERROR_MESSAGE, WAREHOUSE_SELECTOR_PLACEHOLDER, WAREHOUSE_SELECTOR_TITLE } = require(`../../../../../languages/${language}/languages`);

    const { selectedShippingLine, selectedCity, warehousesData, setWarehousesData } = props;

    const [getNovaPoshtaCityRef] = useLazyQuery(GET_NOVA_POSHTA_CITY_REF);
    const [getNovaPoshtaWarehouses, { loading: novaPoshtaWarehousesLoading }] = useLazyQuery(GET_NOVA_POSHTA_WAREHOUSES);

    const placeHolder = !warehousesData.length && WAREHOUSE_SELECTOR_PLACEHOLDER;

    function selectOnInputHandler(onInputEvent: any) {

        if (onInputEvent.target.value.length > 0) {

            getNovaPoshtaCityRef({ variables: { params: { regExp: selectedCity } } })
                .then((response) => {
                    getNovaPoshtaWarehouses({
                        variables: {
                            params: {
                                cityRef: response.data.allWpNovaPoshtaCities[0].ref,
                                regExp: onInputEvent.target.value,
                                limit: 4
                            }
                        }
                    })
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
        <>
            {
                selectedShippingLine === 'ukrposhta_shippping'
                    ? <InputField name="address_1" onErrorMessage={WAREHOUSE_SELECTOR_ERROR_MESSAGE} placeholder={placeHolder} required>{WAREHOUSE_SELECTOR_TITLE}</InputField>
                    : <Select
                        name="address_1"
                        label={WAREHOUSE_SELECTOR_TITLE}
                        onErrorMessage={WAREHOUSE_SELECTOR_ERROR_MESSAGE}
                        placeHolder={placeHolder}
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
            }
        </>
    )
}

export default WarehouseSelector;