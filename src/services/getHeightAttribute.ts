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

function getName(attributeName: string): string {
    return attributeName.split('/')[1].toLowerCase();
}

function getHeightAttribute(productAttributes: ProductAttributes): ProductAttribute | void {
    for (let i = 0; i < productAttributes.length; i++) {
        let attribute = productAttributes[i];
        if (getName(attribute.name) == "height") return attribute;
    }
}

export default getHeightAttribute;