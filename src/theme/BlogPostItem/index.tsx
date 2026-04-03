import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import Head from '@docusaurus/Head';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

export default function BlogPostItemWrapper(props) {
  const {metadata} = useBlogPost();
  const {title, description, date, permalink, authors, frontMatter} = metadata;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    datePublished: date,
    url: `https://blog.siansiansu.com${permalink}`,
    author: authors?.map((author) => ({
      '@type': 'Person',
      name: author.name,
      url: author.url,
    })) || [],
    publisher: {
      '@type': 'Organization',
      name: 'Bîn-hiân ê 簿仔紙',
      url: 'https://blog.siansiansu.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blog.siansiansu.com/img/logo.png',
      },
    },
    ...(frontMatter.image && {
      image: `https://blog.siansiansu.com${frontMatter.image}`,
    }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://blog.siansiansu.com${permalink}`,
    },
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <BlogPostItem {...props} />
    </>
  );
}
