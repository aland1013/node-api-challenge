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

module.exports = router;
