const express = require('express');
const router = express.Router();

router.get('/a', (req, res, next) => {
  res.send('users route a');
});
router.get('/b', (req, res, next) => {
  res.send('users route b');
});
router.get('/c', (req, res, next) => {
  res.send('users route c');
});
router.get('/d', (req, res, next) => {
  res.send('users route c');
});

module.exports = router;
