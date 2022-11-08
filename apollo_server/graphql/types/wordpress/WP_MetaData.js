const WP_MetaData = `#graphql

  type WP_MetaData {
    title: String
    description: String
    article_modified_time: String
    og_description: String
    og_locale: String
    og_site_name: String
    og_title: String
    og_type: String
    og_url: String
    schema: WP_MetaShema
  }

  type WP_MetaShema {
    context: String
    graph: [WP_MetaGraph]
  }

  type WP_MetaGraph {
    name: String
    url: String
    id: String
    type: String
    dateModified: String
    datePublished: String
    description: String
    inLanguage: String
  }
`;

module.exports = WP_MetaData;