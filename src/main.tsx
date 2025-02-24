import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.tsx'
import Details from './pages/Details.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
        <BrowserRouter>
        <Routes> 
           <Route path="/" element={<Home />} />
           <Route path="/:id" element={<Details />} />
        </Routes>
    </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
