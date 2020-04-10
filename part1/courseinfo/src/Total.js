import React from 'react';

const Total = (props) => {

  let totalExcercises = 0;

  props.data.forEach((data, index) => {
    let exercises = `exercises${index + 1}`;
    totalExcercises += data[exercises];
  });

  return (
    <p>Number of exercises {totalExcercises}</p>
  );
}

export default Total;