import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import Statistics from './Statistics';

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (e) => {
    if (e.target.textContent === 'good') {
      setGood(good + 1);
    }

    if (e.target.textContent === 'neutral') {
      setNeutral(neutral + 1);
    }

    if (e.target.textContent === 'bad') {
      setBad(bad + 1);
    }
  }

  return (
    <div>
      <h2>give feedback</h2>

      <Button handleClick={handleClick} text={'good'} />
      <Button handleClick={handleClick} text={'neutral'} />
      <Button handleClick={handleClick} text={'bad'} />

      <h2>Statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />

    </div>
  );
}

ReactDOM.render(<App />,
  document.getElementById('root')
);