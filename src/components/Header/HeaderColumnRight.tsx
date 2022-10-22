import React from "react";
import LanguageSelector from "../LanguageSelector";
import HeaderShoppingCartButton from "../Buttons/HeaderShoppingCartButton";
import HideOnMobileWrapper from "../../styles/HideOnMobileWrapper";
import styled from "styled-components";

const StyledHeaderColumnRight = styled.div`
    display: flex;
    align-items: center;
`;

const HeaderColumnRight = () => {

    return (
        <StyledHeaderColumnRight>
            <HideOnMobileWrapper>
                <LanguageSelector />
            </HideOnMobileWrapper>
            <HeaderShoppingCartButton />
        </StyledHeaderColumnRight>
    )
}

export default HeaderColumnRight;