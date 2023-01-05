require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`
});

export default {
    title: process.env.SITE_TITLE,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    author: {
        name: 'Artem Glushenko'
    }
}