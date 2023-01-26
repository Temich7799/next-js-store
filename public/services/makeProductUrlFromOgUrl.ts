export function makeProductUrlFromOgUrl(category: string, og_url: string, language: string = '') {

    const prefix = 'products';

    const arr = og_url.split('/');

    return `${language === 'ru' ? '' : `${language}/`}${prefix}/${category}/${arr[arr.length - 2]}`;
};