const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader('Content-Type', 'text/html');

  if (url === '/' && method === 'GET') {
    res.write('<h1>Home</h1>');
    res.write('<h1>Home1</h1>');
    res.end();
    return;
  }

  if (url === '/message' && method === 'GET') {
    res.write(
      '<form method="POST" action="/message"><input type="text" name="message"></input><button type="submit">Send Message</button></form>'
    );
    res.end();
    return;
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      console.log(body);
      const parsedData = Buffer.concat(body).toString();
      console.log(parsedData);
    });
  }
  res.write('Not found');
  res.end();
});

server.listen(3000);
