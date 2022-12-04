import type { GatsbyConfig } from "gatsby";
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: process.env.SITE_TITLE,
    siteUrl: process.env.GATSBY_SITE_URL
  },
  flags: {
    DEV_SSR: true
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-breadcrumb",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/logo/mobile_logo.svg',
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 90,
        }
      }
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        "url": process.env.WP_GRAPHQL_URL,
        schema: {
          timeout: 100000
        }
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        "trackingId": "none"
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: '@pasdo501/gatsby-source-woocommerce',
      options: {
        api: process.env.GATSBY_WC_URL,
        https: true,
        api_keys: {
          consumer_key: process.env.GATSBY_WC_KEY,
          consumer_secret: process.env.GATSBY_WC_SECRET,
        },
        fields: ['products', 'products/categories']
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Noto Serif:400,700', 'Didact Gothic:400,700']
        }
      }
    }
  ]
};

export default config;
