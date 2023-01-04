import Link from 'next/link'
import React, { useContext } from "react"
import { useFetchProducts } from "../../services/hooks/graphql/useFetchProducts"
import useActualDate from "../../services/hooks/useActualDate"
import { LangContext } from "../Layouts/Layout"
import BlockContent from "./BlockContent"
import TileBlock from "./TileBlock"

const NewArrivalsBlock = () => {

    const { language } = useContext(LangContext);
    const { BLOCK_NEW_ARRIVALS_TITLE, BLOCK_NEW_ARRIVALS_DETAILS, MOBILE_HEADER_SUBMENU_SEE_ALL } = require(`../../languages/${language}/languages`);

    const date = useActualDate();
    const { data } = useFetchProducts(language, { after: date });

    return (
        <TileBlock color="#c2ef80">
            <BlockContent title={BLOCK_NEW_ARRIVALS_TITLE} count={data ? data.length : 0} iconPath={""} gridTemplateAreas={
                `
                    Title Title Title Icon"
                    "Title Title Title Icon"
                    "Details Details Details Count"
                    "Details Details Details Count
                `}
            >
                <p>{BLOCK_NEW_ARRIVALS_DETAILS}</p>
                <Link href="new-arrivals">{MOBILE_HEADER_SUBMENU_SEE_ALL}</Link>
            </BlockContent>
        </TileBlock >
    )
}

export default NewArrivalsBlock;
