export function makeProductUrlFromOgUrl(og_url: string, language: string = '') {
    return `${language === 'ru' ? '' : `${language}/`}${og_url.split('https://malinikids.com/')[1]
        }`;
};