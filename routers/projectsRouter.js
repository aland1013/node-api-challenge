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

/* ----- GET /api/projects/:id/actions ----- */
router.get('/:id/actions', (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error getting the actions for the project'
      });
    });
});

/* ----- POST /api/projects ----- */
router.post('/', (req, res) => {
  const newProject = req.body;

  if (!newProject.name || !newProject.description) {
    res.status(404).json({
      message: 'Please include a project name and description'
    });
  } else {
    Projects.insert(newProject)
      .then((project) => {
        res.status(201).json(project);
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Error adding the project'
        });
      });
  }
});

/* ----- DELETE /api/projects/:id ----- */
router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: 'The project has been removed'
        });
      } else {
        res.status(404).json({
          message: 'The project could not be found'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error removing the project'
      });
    });
});

/* ----- UPDATE /api/projects/:id ----- */
router.put('/:id', (req, res) => {
  const changes = req.body;

  Projects.update(req.params.id, changes)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({
          message: 'The project could not be found'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error updating the project'
      });
    });
});

module.exports = router;
