import * as React from "react"
import { Link } from "gatsby"
import links from "./links"

const SocialsList = () => {
    return (
        <nav>
            {links.map((IconLink) => <Link to={IconLink.url}>{IconLink.svg}</Link>)}
        </nav>
    )
}

export default SocialsList
