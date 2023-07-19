import { ApolloServer, gql } from 'apollo-server-micro';
import fetch from 'node-fetch';

const typeDefs = gql`
  type Query {
    fetchData: String
  }
`;

const resolvers = {
  Query: {
    fetchData: async () => {
      const response = await fetch(
        'https://ckan.indiadataportal.com/api/3/action/datastore_search?limit=100000&resource_id=011d2088-3ed5-488f-9863-42c2ba2fa3ea'
      );
      const data = await response.json();
      return JSON.stringify(data);
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
