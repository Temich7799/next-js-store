import * as React from "react"
import SocialsList from "../SocialsList/SocialsList"
import Menu from "./Menu/Menu"

const Header = () => {
    return (
        <header>
            <SocialsList />
            <Menu />
        </header>
    )
}

export default Header
