const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('Inside middleware');
  req.name = 'ritu';
  next();
});

app.use((req, res, next) => {
  console.log('Inside middleware 2');
  req.name = 'rituparna';
  next();
});

app.get('/', (req, res) => {
  console.log('in get route at /');
  res.send('<h1>' + req.name + '</h1>');
});

app.listen(3000);
