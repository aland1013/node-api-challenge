const express = require('express');
const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');

const router = express.Router();

/* ----- GET /api/actions ----- */
router.get('/', (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error retrieving the actions'
      });
    });
});

/* ----- GET /api/actions/:id ----- */
router.get('/:id', (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({
          message: 'Action not found'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error retrieving the action'
      });
    });
});

/* ----- POST /api/actions ----- */
router.post('/', (req, res) => {
  const newAction = req.body;

  if (!newAction.project_id) {
    res.status(404).json({
      message: 'Please include a project_id'
    });
  } else if (!newAction.description || !newAction.notes) {
    res.status(404).json({
      message: 'Please include a description and notes'
    });
  } else {
    Projects.get(newAction.project_id)
      .then((project) => {
        if (project) {
          Actions.insert(newAction)
            .then((action) => {
              res.status(201).json(action);
            })
            .catch((err) => {
              res.status(500).json({
                message: 'Error adding the action'
              });
            });
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
  }
});

/* ----- DELETE /api/actions/:id ----- */
router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: 'The action has been removed'
        });
      } else {
        res.status(404).json({
          message: 'The action could not be found'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error removing the action'
      });
    });
});

/* ----- UPDATE /api/actions/:id ----- */
router.put('/:id', (req, res) => {
  const changes = req.body;

  Actions.update(req.params.id, changes)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({
          message: 'The action could not be found'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error updating the action'
      });
    });
});

module.exports = router;
