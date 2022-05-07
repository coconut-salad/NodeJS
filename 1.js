const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader('Content-Type', 'text/html');

  if (url === '/') {
    res.write('<h1>Home</h1>');
    res.end();
    return;
  }

  if (url === '/message') {
    res.write(
      '<form method="POST" action="/rcv"><input type="text" name="message"></input><button type="submit">Send Message</button></form>'
    );
    res.end();
    return;
  }

  if (url === '/rcv' && method === 'POST') {
    console.log('inside rcv route');
  }
  res.write('Not found');
  res.end();
});

server.listen(3000);
