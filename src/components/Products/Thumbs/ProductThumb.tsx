import React from "react"
import { Link } from "gatsby";
import styled from "styled-components"
import ImageSVG from "../../ImageSVG";
import Button from "../../Button";
import ProductPrice from "../ProductPrice";
import { PRODUCT_SKU } from "../../../languages/ru/languages";
import { useShoppingCartVar } from "../../../services/hooks/useShoppingCartVar";
import { useLastProductPageVar } from "../../../services/hooks/useLastProductPageVar";

type ProductProps = {
    data: Product
    absolutePath?: string
}

type Product = {
    name: string
    price: string
    sku: string
    stock_quantity: number | null
    stock_status: string
    sale_price: string
    image: {
        alt: string
        src: string
    }
    categories: [
        {
            slug: string
        }
    ]
    wordpress_id: number
}

const StyledProductThumb = styled.div`
    height: 320px;
    min-width: 225px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    img {
        width:100%;
        height: 240px;
        object-fit: cover;
    }
`;

const ProductImage = styled.div`
    position: relative;
`;

const ProductCaption = styled.div`
    font-family: 'Amatic SC';
    font-size: 20px;
    height: 55px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
        margin: 0;
    }
`;

const ProductThumb = (props: ProductProps) => {

    const { data, absolutePath } = props;
    if (data.sku == '') data.sku = data.wordpress_id.toString();

    const { add: addToCart } = useShoppingCartVar();
    const { save: saveLastProductPage } = useLastProductPageVar();

    function buttonOnClickHandler(): void {
        addToCart(data.wordpress_id, data);
        saveLastProductPage();
    }

    function thumbOnClickHandler(): void {
        saveLastProductPage();
    }

    return (
        <StyledProductThumb onClick={thumbOnClickHandler}>
            <ProductImage>
                {
                    absolutePath
                        ? <a href={absolutePath}><img src={data.image.src} alt={data.image.alt} /> </a>
                        :
                        <Link to={`${data.categories[0].slug}-${data.sku}`}>
                            <img src={data.image.src} alt={data.image.alt} />
                        </Link>

                }
            </ProductImage>
            <ProductCaption>
                <div>
                    <p>{PRODUCT_SKU}: {data.sku}</p>
                    <ProductPrice price={data.price} salePrice={data.sale_price} />
                </div>
                <div>
                    <Button id="shoppingCartButton" buttonSize="shrink" buttonStyle="transparent" onClick={buttonOnClickHandler}>
                        <ImageSVG path='/svg/add_to_cart.svg' height="25px" width="25px" />
                    </Button>
                </div>
            </ProductCaption>
        </StyledProductThumb >
    )
}

export default ProductThumb;