import React from 'react';
import App from './App.js';
import { ApolloProvider as ApolloHooksProvider, createHttpLink, InMemoryCache, ApolloClient} from '@apollo/react-hooks'
import {setContext} from 'apollo-link-context'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
});

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});


export default (
    <ApolloHooksProvider client={client}>
        <App/>
    </ApolloHooksProvider>
  
);