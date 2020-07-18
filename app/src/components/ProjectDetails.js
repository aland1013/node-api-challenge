import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectDetails = (props) => {
  const { id, description, completed } = props.project;

  console.log('isShowing', props.isShowing);

  const [actions, setActions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/projects/${id}/actions`)
      .then((res) => setActions(res.data))
      .catch((err) => console.log('err', err));
  }, []);

  console.log('id', id);

  return props.isShowing ? (
    <div>
      {actions.map((action) => (
        <div key={action.id}>
          {action.description}
          {action.notes}
        </div>
      ))}
    </div>
  ) : null;
};

export default ProjectDetails;
