const express = require('express');
const Projects = require('../data/helpers/projectModel');

const router = express.Router();

/* ----- GET /api/projects ----- */
router.get('/', (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error retrieving the projects'
      });
    });
});

/* ----- GET /api/projects/:id ----- */
router.get('/:id', (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({
          message: 'Project not found'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error retrieving the project'
      });
    });
});

module.exports = router;
