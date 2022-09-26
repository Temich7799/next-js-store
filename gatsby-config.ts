import type { GatsbyConfig } from "gatsby";
require("dotenv").config();

const config: GatsbyConfig = {
  siteMetadata: {
    title: process.env.SITE_TITLE,
    siteUrl: process.env.SITE_URL
  },
  flags: {
    DEV_SSR: true
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-breadcrumb",
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        "url": process.env.WP_GRAPHQL_URL,
        schema: {
          timeout: 50000
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
        api: process.env.WC_URL,
        https: true,
        api_keys: {
          consumer_key: process.env.WC_KEY,
          consumer_secret: process.env.WC_SECRET,
        },
        fields: ['products', 'products/categories']
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Amatic SC:400,700', 'Comfortaa:400,700', 'Laila']
        }
      }
    }
  ]
};

export default config;
