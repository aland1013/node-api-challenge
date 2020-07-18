import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Project from './components/Project';

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/projects')
      .then((res) => setProjects(res.data))
      .catch((err) => console.log('err', err));
  }, []);

  return (
    <>
      <h1>Sprint Challenge: Express and Node.js - Projects & Actions</h1>
      <ul>
        {projects.map((project) => (
          <li>
            <Project id={project.id} project={project} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
