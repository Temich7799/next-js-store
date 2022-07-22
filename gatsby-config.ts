import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Nines d'Onil`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        "url": "http://localhost:8888/wordpress/graphql",
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
    }, "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-styled-components", "gatsby-plugin-breadcrumb",
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
        api: 'localhost:8888/wordpress',
        https: false,
        api_keys: {
          consumer_key: 'ck_0db198da88b1a81b2e7766af5126771190b31b96',
          consumer_secret: 'cs_601709c4babde4702e285a2f972dad154f2021c7',
        },
        fields: ['products', 'products/categories', 'products/attributes']
      }
    }
  ]
};

export default config;
