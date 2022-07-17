import * as React from "react"
import { Link } from "gatsby";
import styled from "styled-components"

const StyledProductThumb = styled.div`
    height: 245px;
    max-width: 167px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    img {
        width:100%;
    }
`;

const Caption = styled.div`
    font-family: 'Amatic SC';
    font-size: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    p {
        margin: 0;
    }
`;

const ProductThumb = ({ data }: any) => {
    return (
        <StyledProductThumb>
            <Link to={data.slug}>
                <img src={data.images[0].src} alt={data.images[0].alt} />
            </Link>
            <Caption>
                <p>SKU: {data.sku}</p>
                <p>Price: <b>{data.price}</b>$</p>
            </Caption>
        </StyledProductThumb>
    )
}

export default ProductThumb;