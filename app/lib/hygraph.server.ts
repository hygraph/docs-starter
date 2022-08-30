import { GraphQLClient } from 'graphql-request';

import { getSdk } from '~/generated/schema.server';

export const hygraph = new GraphQLClient(
  process.env.HYGRAPH_ENDPOINT as string,
);

export function sdk({
  preview,
}: {
  preview?: boolean;
}): ReturnType<typeof getSdk> {
  const API_TOKEN = preview
    ? process.env.HYGRAPH_DEV_TOKEN
    : process.env.HYGRAPH_PROD_TOKEN;

  hygraph.setHeader(`authorization`, `Bearer ${API_TOKEN}`);

  try {
    return getSdk(hygraph);
  } catch (error: any) {
    console.error(JSON.stringify(error, undefined, 2));
    return error;
  }
}
