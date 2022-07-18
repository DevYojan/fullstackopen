import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';

const Authors = (props) => {
  const [born, setBorn] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('Select a author from dropdown list');

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  if (!props.authors) {
    return <div>Loading...</div>;
  }

  const authors = props.authors.allAuthors;

  const submit = async (event) => {
    event.preventDefault();

    await updateAuthor({
      variables: { name: selectedAuthor, born: parseInt(born) },
    });
    setSelectedAuthor('Select a author from dropdown list');
    setBorn('');
  };

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Set authors birth year</h2>
        <form onSubmit={submit}>
          <div>
            Select Author:
            <select
              value={selectedAuthor}
              onChange={({ target }) => setSelectedAuthor(target.value)}
            >
              <option value=''>Select Author</option>
              {authors.map((author) => {
                return (
                  <option key={author.name} value={author.name}>
                    {author.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            born <input value={born} onChange={({ target }) => setBorn(target.value)} />
          </div>
          <button type='submit'>Update Author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
