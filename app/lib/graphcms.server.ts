import { GraphQLClient } from 'graphql-request';

export const graphcms = new GraphQLClient(
  process.env.GRAPHCMS_ENDPOINT as string,
);
