const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  console.log('in get route at /');
  res.send(
    '<form method="POST" action="/message"><input type="text" name="message"></input><button type="submit">Send Message</button></form>'
  );
});

app.post('/message', (req, res) => {
  // console.log(req.body);
  // res.send("the server recive=d "+req.body.message )
  // res.redirect('/');

  fs.writeFileSync('./sample.json', JSON.stringify(req.body));
  res.send('data saved');
});

app.listen(3000);
