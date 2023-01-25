import { MenuItemType } from "./MenuItemType"

export type BaseTemplateProps = {
    data: {
        menuItems: {
            headerMenuItems: [MenuItemType]
            footerMenuItems: [MenuItemType]
        }
    }
    children: JSX.Element | string
    language?: string
}