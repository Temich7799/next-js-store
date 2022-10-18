import React from "react"
import Layout from "../../components/Layouts/Layout";
import ProductClientPageContent from "../../components/Content/ProductClientPageContent";
import { GatsbyRouteLocation } from "../../types/GatsbyRouteLocation";

type ProductClientPageProps = {
    location: GatsbyRouteLocation
}

const ProductClientPage = (props: ProductClientPageProps) => {

    return (
        <Layout language="uk">
            <ProductClientPageContent search={props.location.search} />
        </Layout>
    )
}

export default ProductClientPage;