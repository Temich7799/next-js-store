export type MenuItemType = {
    path: string
    title: string
    url: string
    child_items: [MenuItemType] | null
}