import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const App = () => {
  
  const course = {
    name: 'Half Stack application development',

    parts: [
      {
        part1: 'Fundamentals of React',
        exercises1: 10,
      },
      {
        part2: 'Using props to pass data',
        exercises2: 7
      },
      {
        part3: 'State of a component',
        exercises3: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content data={course.parts} />
      <Total data={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));