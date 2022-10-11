export type MenuItemType = {
    title: string
    slug: string | null
    child_items: [MenuItemType] | null
}