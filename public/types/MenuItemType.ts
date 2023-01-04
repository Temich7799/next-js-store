export type MenuItemType = {
    path: string
    title: string
    url: string
    slug: string
    child_items: [MenuItemType] | null
}