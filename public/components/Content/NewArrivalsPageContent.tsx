import React, { useContext } from "react";
import { useFetchProducts } from "../../services/hooks/graphql/useFetchProducts";
import useActualDate from "../../services/hooks/useActualDate";
import { PageContext } from "../Layouts/Layout";
import ProductsListPageContent from "./ProductsListPageContent";

const NewArrivalsPageContent = () => {

    const { language } = useContext(PageContext);

    const date = useActualDate();
    const { data } = useFetchProducts(language, { after: date });

    return <ProductsListPageContent data={data} />
}

export default NewArrivalsPageContent;