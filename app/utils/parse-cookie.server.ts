import type { Cookie } from 'remix';

export const parseCookie = async (request: Request, cookie: Cookie) => {
  const cookieHeader = request.headers.get('Cookie');
  const parsedCookie = (await cookie.parse(cookieHeader)) || {};

  return parsedCookie;
};
