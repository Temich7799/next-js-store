import React from "react"
import Layout from "../../components/Layouts/Layout";
import ProductClientPageContent from "../../components/Content/ProductClientPageContent";
import { GatsbyRouteLocation } from "../../types/GatsbyRouteLocation";
import useYoastMetaData from "../../services/hooks/useYoastMetaData";
import { HeadProps } from "gatsby";
import MetaData from "../../components/Layouts/MetaData";

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

export const Head = (props: HeadProps) => {

    const { pathname }: any = props.location;
    const productId = parseInt(pathname.split('=')[1]);

    const { metaData, openGraphData } = useYoastMetaData(`product?id=${productId}`, {
        openGraphData: {
            og_url: process.env.GATSBY_SITE_URL
        }
    });

    const linkedData = {
        context: '',
        type: '',
        name: ''
    };

    return <MetaData data={metaData} linkedData={linkedData} openGraphData={openGraphData} />
}