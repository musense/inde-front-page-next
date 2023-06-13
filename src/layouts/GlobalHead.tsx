import '@assets/css/bootstrap.min.css';
import Head from 'next/head';
import React from 'react';
const env = process.env;

export interface HeadProps {
  title      : string;
  description: string;
  keywords   : string;
  pathname   : string;
  image      : string;
}

export default function GlobalHead({ props }: { props: HeadProps }) {
  const {
    title,
    description,
    keywords,
    image = '/placeholder-social.jpg',
    pathname,
  } = props;

  const url = env.NEXT_PUBLIC_SITE ? env.NEXT_PUBLIC_SITE : env.url;
  const canonicalURL = new URL(pathname, url) as unknown as string;
  const imageURl = new URL(image, url) as unknown as string;

  let headTitle = title,
    headDescription = description,
    headKeywords = keywords;

  return (
    <Head>
      {/* Global Metadata */}
      <meta charSet='utf-8' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1'
      />
      <link
        rel='icon'
        type='image/svg+xml'
        href='/favicon.ico'
      />
      <link
        rel='canonical'
        href={canonicalURL}
      />

      {/* Primary Meta Tags */}
      <title>{headTitle}</title>
      <meta
        name='title'
        content={headTitle}
      />
      <meta
        name='description'
        content={headDescription}
      />
      <meta
        name='keywords'
        content={headKeywords}
      />

      {/* Open Graph / Facebook */}
      <meta
        property='og:type'
        content='website'
      />
      <meta
        property='og:url'
        content={canonicalURL}
      />
      <meta
        property='og:title'
        content={headTitle}
      />
      <meta
        property='og:description'
        content={headDescription}
      />
      <meta
        property='og:image'
        content={imageURl}
      />

      {/* Twitter */}
      <meta
        property='twitter:card'
        content='summary_large_image'
      />
      <meta
        property='twitter:url'
        content={canonicalURL}
      />
      <meta
        property='twitter:title'
        content={headTitle}
      />
      <meta
        property='twitter:description'
        content={headDescription}
      />
      <meta
        property='twitter:image'
        content={imageURl}
      />
    </Head>
  );
}
