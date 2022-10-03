interface ProductProps {
    name: string
    slug: string
    sku: string
    price: string
    sale_price: string
    stock_quantity: number | null
    stock_status: string
    id: string
    categories: [
        {
            slug: string
        }
    ]
    images: [
        {
            alt: string
            src: string
        }
    ]
}

interface ExtendedProduct extends ProductProps {
    wordpress_id: number
    image: {
        src: string
        alt: string
    }
}

export function extendProductByMatchingImages(product: ProductProps, gatsbyImages: Map<number, string>): ExtendedProduct {

    const productId = parseInt(product.id);

    const gatsbyImage = gatsbyImages.get(productId);

    return {
        ...product,
        wordpress_id: productId,
        image: {
            src: gatsbyImage ? gatsbyImage : product.images[0].src,
            alt: product.images[0].alt
        }
    };
}