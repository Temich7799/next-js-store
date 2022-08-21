export function formatCatalogChildItemUrl(url: string): string {
    return document.location.origin + '/catalog/' + url.split('/product-category/')[1];
}