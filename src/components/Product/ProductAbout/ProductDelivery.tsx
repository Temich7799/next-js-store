import React, { useContext } from "react"
import Image from 'next/image';
import styled from "styled-components"
import { LangContext } from "../../Layouts/Layout";
import Link from 'next/link';

const StyledProductDelivery = styled.div`
    display: flex;
`;

const DeliveryAbout = styled.div`
    display: flex;
    width: 100%;
    margin: 7% 0;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
`;

const DeliveryIcons = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 15px;
`;

const ProductDelivery = () => {

    const { language, langPrefix } = useContext(LangContext);
    const { DELIVERY_ABOUT_AFTERPAY_INFO, DELIVERY_ABOUT_DELIVERY_INFO } = require(`../../../languages/${language}/languages`);

    return (
        <StyledProductDelivery>
            <DeliveryAbout>
                <Link href={`/${langPrefix}shipping-and-payment`}>{DELIVERY_ABOUT_DELIVERY_INFO}</Link>
                <Link href={`/${langPrefix}shipping-and-payment`}>{DELIVERY_ABOUT_AFTERPAY_INFO}</Link>
            </DeliveryAbout>
            <DeliveryIcons>
                <Image src="../../../images/delivery/nova_poshta.svg" alt="nova-poshta-icon" width={30} height={30} layout="fixed" placeholder="blur" />
                <Image src="../../../images/delivery/ukrposhta.svg" alt="ukrposhta-icon" width={30} height={30} layout="fixed" placeholder="blur" />
            </DeliveryIcons>
        </StyledProductDelivery>
    )
}

export default ProductDelivery;