export function formatCatalogChildItemUrl(url: string): string {
    return process.env.GATSBY_SITE_URL + '/catalog/' + url.split('/product-category/')[1];
}