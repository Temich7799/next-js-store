type ProductAttributes = [
    {
        options: [string]
        name: string
    }
]

type ProductAttribute = {
    options: [string]
    name: string
}

export function checkName(attributeName: string): boolean {
    return (attributeName.indexOf('/') == -1) ? false : true
}

export function getName(attributeName: string): string {
    const split = attributeName.split('/');
    return (checkName(attributeName)) ? split[1].toLowerCase() : split[0].toLowerCase()
}

export function makePath(attributeName: string): string {
    return `/svg/${getName(attributeName)}.svg`
}

export function getHeightAttribute(productAttributes: ProductAttributes): ProductAttribute | void {
    for (let i = 0; i < productAttributes.length; i++) {
        let attribute = productAttributes[i];
        if (getName(attribute.name) == "height") return attribute;
    }
}