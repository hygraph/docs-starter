import urljoin from 'url-join';

import type { MetaDescriptor } from '@remix-run/react';

const defaultDomain = 'https://docs.withheadlesscms.com';

export function removeTrailingSlash(s: string) {
  return s.endsWith('/') ? s.slice(0, -1) : s;
}

export function getUrl(requestInfo?: { origin: string; path: string }) {
  return removeTrailingSlash(
    urljoin(requestInfo?.origin ?? defaultDomain, requestInfo?.path ?? ''),
  );
}

export function getDomainUrl(request: Request) {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');

  if (!host) {
    throw new Error('Could not determine domain URL.');
  }

  const protocol = host.includes('localhost') ? 'http' : 'https';

  return `${protocol}://${host}`;
}

export function getSocialMetas({
  url,
  title = 'Docs Starter - Hygraph',
  description = 'Docs Starter built with Remix and powered by Hygraph. No longer are you tied to markdown files, Git workflows, and writing documentation in your code editor.',
  noindex = false,
  image,
  requestInfo,
}: {
  requestInfo?: { origin: string; path: string };
  image?: string;
  url: string;
  title?: string;
  description?: string;
  noindex?: boolean;
}): MetaDescriptor[] {
  const origin = requestInfo?.origin;

  const parsedImage = image
    ? image
    : urljoin(origin ?? defaultDomain, '/og-image.png');

  return [
    {
      title,
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'image',
      content: parsedImage,
    },
    {
      name: 'robots',
      content: noindex ? 'noindex' : 'index',
    },
    {
      tagName: 'link',
      rel: 'canonical',
      href: getUrl(requestInfo),
    },
    // Open Graph
    {
      property: 'og:url',
      content: url,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:image',
      content: parsedImage,
    },
    // Twitter
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:image',
      content: parsedImage,
    },
    {
      name: 'twitter:alt',
      content: title,
    },
    {
      name: 'twitter:creator',
      content: '@hygraph',
    },
    {
      name: 'twitter:site',
      content: '@hygraph',
    },
  ];
}
