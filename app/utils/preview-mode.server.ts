import { createCookie } from 'remix';

export const previewModeCookie = createCookie('preview-mode', {
  path: '/',
  sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax',
  secure: process.env.NODE_ENV !== 'development',
  httpOnly: true,
});

export async function isPreviewMode(request: Request) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await previewModeCookie.parse(cookieHeader)) || {};

  return cookie.preview;
}
