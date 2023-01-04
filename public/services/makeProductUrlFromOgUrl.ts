export function makeProductUrlFromOgUrl(category: string, og_url: string, language: string = '') {

    const arr = og_url.split('/');

    return `${language === 'ru' ? '' : `${language}/`}${category}/${arr[arr.length - 2]}`;
};