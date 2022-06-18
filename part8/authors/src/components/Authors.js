import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';

const Authors = (props) => {
  const [authorName, setAuthorName] = useState('');
  const [born, setBorn] = useState('');

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

    await updateAuthor({ variables: { name: authorName, born: parseInt(born) } });

    setAuthorName('');
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
            name <input value={authorName} onChange={({ target }) => setAuthorName(target.value)} />
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
