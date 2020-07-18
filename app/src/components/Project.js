import React, { useState } from 'react';

import ProjectDetails from './ProjectDetails';

const Project = (props) => {
  const { id, name } = props.project;
  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <div key={id}>
        {name}
        <button onClick={() => setIsShowing(!isShowing)}>show details</button>
      </div>
      <ProjectDetails project={props.project} isShowing={isShowing} />
    </>
  );
};

export default Project;
