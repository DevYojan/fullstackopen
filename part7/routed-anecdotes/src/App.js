import React, { useState } from 'react';
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  BrowserRouter as Router,
} from 'react-router-dom';
import { useField } from './hooks';

const Menu = (props) => {
  const padding = {
    paddingRight: 10,
  };

  const match = useRouteMatch('/anecdotes/:id');
  const anecdote = match
    ? props.anecdotes.find((anecdote) => anecdote.id === match.params.id)
    : null;

  return (
    <div>
      <Link to='/about' style={padding}>
        About
      </Link>
      <Link to='/createNew' style={padding}>
        Create New
      </Link>
      <Link to='/anecdotes' style={padding}>
        Anecdotes
      </Link>

      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/createNew'>
          <CreateNew addNew={props.addNew} setNotification={props.setNotification} />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={props.anecdotes} />
        </Route>
      </Switch>
    </div>
  );
};

const Anecdote = ({ anecdote }) => (
  <div>
    <h3>{anecdote.content}</h3>
    <p>has {anecdote.votes} votes</p>
    <p>
      For more info see <a href={anecdote.info}>{anecdote.info}</a>
    </p>
  </div>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
          <li>{anecdote.content}</li>
        </Link>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an incident. Occasionally
      humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke
      laughter but to reveal a truth more general than the brief tale itself, such as to
      characterize a person by delineating a specific quirk or trait, to communicate an abstract
      idea about a person, place, or thing through the concrete details of a short narrative. An
      anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can find the best and add
      more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>. See{' '}
    <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const content = useField('');
  const author = useField('');
  const info = useField('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    props.setNotification(`${content.value} by ${author.value} has been added successfully.`);
    setTimeout(() => {
      props.setNotification('');
    }, 10000);

    history.push('/');
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name='author' value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' value={info.value} onChange={info.onChange} />
        </div>
        <button type='submit'>create</button>
        <button type='reset' onClick={() => handleReset()}>
          reset
        </button>
      </form>
    </div>
  );
};

const Notification = ({ notification }) => {
  const style = {
    padding: 1,
    backgroundColor: 'green',
  };

  return <div style={style}>{notification}</div>;
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ]);

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <Router>
        {notification ? <Notification notification={notification} /> : null}
        <h1>Software anecdotes</h1>
        <Menu anecdotes={anecdotes} addNew={addNew} setNotification={setNotification} />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
