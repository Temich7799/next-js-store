import * as React from "react"
import { Link } from "gatsby"
import links from "./links"

const Menu = () => {
    return (
        <nav>
            {links.map((link) => <Link to={link.url}>{link.name}</Link>)}
        </nav>
    )
}

export default Menu
