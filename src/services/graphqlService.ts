import { GraphQLClient } from 'graphql-request';
import { Transaction, User } from '@/types';

const endpoint = 'http://localhost:3000/graphql';

export const graphQLClient = new GraphQLClient(endpoint);

export const fetchUsers = async () => {
    const query = `
    query {
      users {
        id
        name
        email
      }
    }
  `;
    const data = await graphQLClient.request<{ users: User[] }>(query);
    return data.users;
};

export const fetchTransactions = async () => {
    const query = `
        query {
            transactions {
                id
                amount
                refNumber
                type
            }
        }
    `;
    const data = await graphQLClient.request<{ transactions: Transaction[] }>(query);
    return data.transactions;
}
