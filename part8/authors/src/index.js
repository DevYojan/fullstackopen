import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
