require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`
});

export default {
    title: process.env.SITE_TITLE,
    url: process.env.GATSBY_SITE_URL,
    author: {
        name: 'Artem Glushenko'
    }
}