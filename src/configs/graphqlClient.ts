import { GraphQLClient } from "graphql-request";
import { ENV } from "@/configs/env";

const endpoint = `${ENV.APP_API_ENDPOINT}/graphql`;

export const graphQLClient = new GraphQLClient(endpoint);
