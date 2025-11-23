import { themes as prismThemes } from "prism-react-renderer";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Bîn-hiân",
  tagline: "賞鳥、野外、台語、軟體、生活",
  favicon: "img/favicon.ico",
  trailingSlash: true,

  url: "https://blog.siansiansu.com",
  baseUrl: "/",
  organizationName: "siansiansu", // Usually your GitHub org/user name.
  projectName: "siansiansu.github.io", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "zh-TW",
    locales: ["zh-TW", "en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          blogTitle: '最近的文章',
          blogDescription: '賞鳥、野外、台語、軟體、生活',
          postsPerPage: 9,
          blogSidebarTitle: '最近文章',
          blogSidebarCount: 'ALL',
          routeBasePath: '/',
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-S4S5T3DX6G",
          anonymizeIP: true,
        },
        sitemap: {
          lastmod: "date",
          filename: "sitemap.xml",
          ignorePatterns: ['/comments/**', '/search/**'],
          changefreq: 'weekly',
          priority: 0.7,
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
    {
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
      type: "text/css",
      integrity:
        "sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==",
      crossorigin: "anonymous",
    },
  ],

  plugins: [
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
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
          content: "Mè-sì ê Blog｜賞鳥、野外、台語、軟體、生活"
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
        {
          name: "google-site-verification",
          content: "QEDNLI8In3Dve5OuHVx9NckoUPYcN2I05JwHQlVER-M"
        }
      ],
      image: "img/profile.jpg",
      navbar: {
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
        copyright: `Copyright © ${new Date().getFullYear()} Soo bîn-hiân`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      docs: {
        sidebar: {
          hideable: false,
          autoCollapseCategories: true,
        },
      },
      algolia: {
        appId: "84MT6LYJ8T",
        apiKey: "ad5d41ddd220936219e557467464a520",
        indexName: "siansiansuio",
        contextualSearch: true,
        searchParameters: {},
      },
    }),
};

export default config;
