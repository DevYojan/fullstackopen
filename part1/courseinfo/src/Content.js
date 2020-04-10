import React from 'react';

const Content = (props) => {

  let contentData = props.data.map(function (data, index) {
    let exercises = `exercises${index + 1}`;
    let part = `part${index + 1}`;

    return `<p>${data[part]} ${data[exercises]}</p>`;
  }).join('');

  return (
    <div dangerouslySetInnerHTML={{ __html: contentData }}>
    </div>
  );
}

export default Content;