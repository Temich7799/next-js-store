import React from "react"
import Layout from "../../public//components/Layouts/Layout";
import ProductClientPageContent from "../../public//components/Content/ProductClientPageContent";
import { GatsbyRouteLocation } from "../../public//types/GatsbyRouteLocation";

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