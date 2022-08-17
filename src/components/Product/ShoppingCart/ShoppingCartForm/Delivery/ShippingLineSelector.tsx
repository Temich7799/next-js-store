import { graphql, useStaticQuery } from "gatsby";
import React, { useEffect, useRef } from "react"
import Select from "../../../../Form/Select/Select";
import SelectOption from "../../../../Form/Select/SelectOption";

type ShippingLineSelectorProps = {
    setSelectedShippingLine: React.Dispatch<React.SetStateAction<string>>
}

const ShippingLineSelector = (props: ShippingLineSelectorProps) => {

    const { setSelectedShippingLine } = props;

    const shippingLineSelector = useRef<any>();

    useEffect(() => shippingLineSelector.current.addEventListener('change', selectOnChangeHandler), []);

    function selectOnChangeHandler(onChangeEvent: any) {
        setSelectedShippingLine(shippingLineSelector.current.value);
    }

    const shippingZonesMethods = useStaticQuery(
        graphql`
            query getAllShippingZonesMethods {
                allWcShippingZones3Methods(filter: {enabled: {eq: true}}) {
                    edges {
                        node {
                            instance_id
                            method_id
                            method_title
                            method_description
                        }
                    }
                }
            }
        `
    );

    return (
        <>
            <label htmlFor="shipping_lines">Delivery</label>
            <Select ref={shippingLineSelector} name="shipping_lines">
                {
                    shippingZonesMethods.allWcShippingZones3Methods.edges.map((method: any) =>
                        <SelectOption value={method.node.method_id}>{method.node.method_title}</SelectOption>)
                }
            </Select>
        </>
    )
}

export default ShippingLineSelector;