import React from 'react';
import Statistic from './Statistic';

const Statistics = ({ good, bad, neutral }) => {

  const total = good + bad + neutral;
  const average = good - bad;
  const positive = (good * 100) / total || 0;

  if (total === 0) {
    return 'No feedback given';
  }

  return (
    <div>
      <table>
      <tbody>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='total' value={total} />
      <Statistic text='average' value={average} />
      <Statistic text='positive' value={positive} />
      </tbody>
      </table>
    </div>
  );
}

export default Statistics;