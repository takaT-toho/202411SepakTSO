const express = require('express');
const router = express.Router();
const regusData = require('../data/regus.json');

router.get('/', (req, res) => {
  res.json(regusData);
});

module.exports = router;