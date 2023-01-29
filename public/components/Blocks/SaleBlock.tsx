import Link from 'next/link';
import React, { useContext } from "react"
import { useFetchProducts } from "../../services/hooks/graphql/useFetchProducts";
import { PageContext } from "../../templates/BaseTemplate";
import BlockContent from "./BlockContent";
import TileBlock from "./TileBlock"

const SaleBlock = () => {

    const { language, langPrefix } = useContext(PageContext);
    const { BLOCK_SALE_TITLE, BLOCK_SALE_DETAILS, MOBILE_HEADER_SUBMENU_SEE_ALL } = require(`../../languages/${language}/languages`);

    const { data, loading } = useFetchProducts(language, { on_sale: true });

    return (
        <TileBlock color="#f4e77c">
            <BlockContent title={BLOCK_SALE_TITLE} isDataFetching={loading} count={data ? data.length : 0} iconPath={""} gridTemplateAreas={
                `
                    Icon Title Title Title"
                    "Count Count . ."
                    "Count Count Details Details"
                    "Count Count . .
                `}
            >
                <Link href={`${langPrefix}sale`}>{MOBILE_HEADER_SUBMENU_SEE_ALL}</Link>
                <p>⬅️ {BLOCK_SALE_DETAILS} %</p>
            </BlockContent>
        </TileBlock>
    )
}

export default SaleBlock;
