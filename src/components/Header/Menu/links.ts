type MenuLinks = {
    name: string;
    url: string;
    sublinks?: Array<MenuLinks>;
};

const links: Array<MenuLinks> = [
    {
        name: "Home",
        url: "https://later"
    },
    {
        name: "Catalog",
        url: "https://later",
        sublinks: [
            {
                name: "Sublink-1",
                url: "https://later"
            },
            {
                name: "Sublink-2",
                url: "https://later"
            },
            {
                name: "Sublink-3",
                url: "https://later"
            }
        ]
    },
    {
        name: "Contacts",
        url: "https://later"
    },
    {
        name: "About Us",
        url: "https://later"
    }
];

export default links;