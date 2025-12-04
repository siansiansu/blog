import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Bîn-hiân ê 簿仔紙",
  tagline: "賞鳥、野外、台語、軟體、生活",
  favicon: "img/favicon.ico",
  trailingSlash: true,

  url: "https://blog.siansiansu.com",
  baseUrl: "/",
  organizationName: "siansiansu",
  projectName: "blog",

  onBrokenLinks: "throw",
  i18n: {
    defaultLocale: "zh-TW",
    locales: ["zh-TW"],
  },
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          blogTitle: 'Bîn-hiân ê 簿仔紙',
          blogDescription: '賞鳥、野外、台語、軟體、生活',
          postsPerPage: 9,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '最近的文章',
          routeBasePath: '/',
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-FYJ71DG1PS",
        },
        sitemap: {
          ignorePatterns: ['/search/**'],
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
      type: "text/css",
      integrity:
        "sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==",
      crossorigin: "anonymous",
      rel: "preload",
      as: "style",
      onload: "this.onload=null;this.rel='stylesheet'",
    },
  ],

  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Bîn-hiân ê 簿仔紙',
        url: 'https://blog.siansiansu.com',
        logo: 'https://blog.siansiansu.com/img/logo.png',
      }),
    },
  ],

  plugins: [
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 85,
        max: 1600,
        min: 640,
        steps: 3,
        disableInDev: false,
      },
    ],
  ],

  themeConfig: ({
      metadata: [
        {
          name: "keywords",
          content: "台語, 賞鳥, eBird, 軟體工程, 程式設計, 生活, blog, 台灣"
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "og:title",
          content: "Bîn-hiân ê Blog｜賞鳥、野外、台語、軟體、生活"
        },
        {
          name: "og:url",
          content: "https://blog.siansiansu.com"
        },
        {
          name: "description",
          content: "探索技術世界：從賞鳥程式到系統架構，分享我的學習心得與實作經驗。記錄賞鳥、野外生活、台語文化與軟體開發的點點滴滴。"
        },
        {
          name: "og:description",
          content: "賞鳥、野外、台語、軟體、生活的個人 blog"
        },
        {
          name: "og:image",
          content: "https://blog.siansiansu.com/img/profile.jpg"
        },
        {
          name: "twitter:image",
          content: "https://blog.siansiansu.com/img/profile.jpg"
        },
        {
          name: "og:type",
          content: "article"
        },
      ],
      image: "img/profile.jpg",
      navbar: {
        title: "Bîn-hiân ê 簿仔紙",
        items: [
          {
            href: "https://portaly.cc/siansiansu",
            label: "作品集",
            position: "left",
          },
          {
            href: "https://portaly.cc/siansiansu/support",
            label: "贊助支持",
            position: "left",
          },
          {
            type: "search",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        copyright: `Copyright © 2024 Soo bîn-hiân`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      algolia: {
        container: '#docsearch',
        appId: '8WAX2BAIGH',
        indexName: 'Bîn-hiân ê 簿仔紙',
        apiKey: 'eab7ae5bcc7ae09cf51643a132f7d9a0',
      },
    }),
};

export default config;
