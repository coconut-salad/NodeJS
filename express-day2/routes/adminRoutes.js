const express = require('express');
const path = require('path');
const router = express.Router();

const basePath = require('./../utils/rootPath');

router.get('/', (req, res, next) => {
  // res.send('admin route a');
  // console.log(__dirname);
  res.sendFile(path.join(basePath, 'views', 'admin.html'));
});

module.exports = router;
