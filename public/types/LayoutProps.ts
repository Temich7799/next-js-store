import { MenuItemType } from "./MenuItemType"

export type LayoutProps = {
    data: {
        menuItems: {
            headerMenuItems: [MenuItemType]
            footerMenuItems: [MenuItemType]
        }
    }
    children: JSX.Element | string
    language?: string
}