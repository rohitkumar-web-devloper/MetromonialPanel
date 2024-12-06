
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { root } from '@/routes'
import { CssBaseline } from '@mui/material'
import AppTheme from './layout/AppTheme'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { SnackbarProvider } from '@/components'
function App() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:7575/graphql',
  });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '',
      },
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: { errorPolicy: 'all' },
      mutate: { errorPolicy: 'all' },
    },
  });
  return (
    <>
      <ApolloProvider client={client}>
        <AppTheme>
          <CssBaseline enableColorScheme />
          <SnackbarProvider>
            <RouterProvider router={createBrowserRouter(root)} />
          </SnackbarProvider>
        </AppTheme>
      </ApolloProvider>
    </>
  )
}

export default App
