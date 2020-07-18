const express = require('express');
const Actions = require('../data/helpers/actionModel');

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

module.exports = router;
