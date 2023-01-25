import React, { useContext } from "react";
import { useFetchProducts } from "../services/hooks/graphql/useFetchProducts";
import useActualDate from "../services/hooks/useActualDate";
import { PageContext } from "./BaseTemplate";
import ProductsListPageTemplate from "./ProductsListPageTemplate";

const NewArrivalsPageTemplate = () => {

    const { language } = useContext(PageContext);

    const date = useActualDate();
    const { data } = useFetchProducts(language, { after: date });

    return <ProductsListPageTemplate data={data} />
}

export default NewArrivalsPageTemplate;