import { createCookie } from 'remix';
import { parseCookie } from './parse-cookie.server';

export const previewModeCookie = createCookie('preview-mode', {
  path: '/',
  sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax',
  secure: process.env.NODE_ENV !== 'development',
  httpOnly: true,
});

export async function isPreviewMode(request: Request) {
  const cookie = await parseCookie(request, previewModeCookie);

  return cookie.preview;
}
