import { useState } from 'react';
import { ALL_BOOKS } from '../queries';
import { useQuery } from '@apollo/client';

const Books = (props) => {
  const [booksByGenre, setBooksByGenre] = useState([]);
  const books = useQuery(ALL_BOOKS);

  const [genre, setGenre] = useState('All Genres');

  if (!props.show) {
    return null;
  }

  let genres = [];
  books.data.allBooks.forEach((book) => {
    genres = genres.concat(book.genres);
  });

  genres = [...new Set(genres)];

  const handleGenreSelection = async (e, genre) => {
    e.preventDefault();
    if (genre !== null && genre !== 'All Books') {
      let booksToShow = books.data.allBooks.filter((book) => book.genres.includes(genre));
      setBooksByGenre(booksToShow);
    }
    setGenre(genre);
  };

  return (
    <div>
      <h2>books</h2>
      In genre <strong>{genre}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre.length > 0
            ? booksByGenre.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : books.data &&
              books.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={(e) => handleGenreSelection(e, genre)}>
            {genre}
          </button>
        ))}
        <button key='allGenres' onClick={(e) => handleGenreSelection(e, 'All Genres')}>
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
