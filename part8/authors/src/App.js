import { useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import { ALL_AUTHORS, ALL_BOOKS } from './queries';
import Notify from './components/Notify';
import { useEffect } from 'react';

const App = () => {
  const [page, setPage] = useState('authors');
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);

  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  useEffect(() => {
    //check if user-data exists in localstorage
    const userToken = localStorage.getItem('user-token');

    if (userToken !== null) {
      setToken(userToken);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token != null && <button onClick={() => setPage('add')}>add book</button>}
        {token === null ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </div>

      {error !== '' && <Notify error={error} setError={setError} />}

      <Authors show={page === 'authors'} authors={authors.data} />

      <Books show={page === 'books'} books={books.data} />

      <NewBook show={page === 'add'} setError={setError} setPage={setPage} />

      <Login show={page === 'login'} setError={setError} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
