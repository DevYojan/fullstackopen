import React from 'react';
import Part from './Part';

const Content = (props) => {

  return (
    <div>
      <Part part={props.data[0].part1} exercise={props.data[0].exercises1} />
      <Part part={props.data[1].part2} exercise={props.data[1].exercises2} />
      <Part part={props.data[2].part3} exercise={props.data[2].exercises3} />
    </div>
  );
}

export default Content;