import React from "react"
import Layout from "../src/components/Layouts/Layout";
import ProductClientPageContent from "../src/components/Content/ProductClientPageContent";
import { GatsbyRouteLocation } from "../src/types/GatsbyRouteLocation";

type ProductClientPageProps = {
    location: GatsbyRouteLocation
}

const ProductClientPage = (props: ProductClientPageProps) => {

    return (
        <Layout>
            <ProductClientPageContent search={props.location.search} />
        </Layout>
    )
}

export default ProductClientPage;