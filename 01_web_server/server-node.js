const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200; // response:ok
    res.setHeader("Content-Type", "text/plain"); // we can send html, json and more
    res.end("hello mj");
  } else if (req.url === "/ice-tea") {
    res.statusCode = 200; // response:ok
    res.setHeader("Content-Type", "text/plain"); // we can send html, json and more
    res.end("here's ur ice tea");
  } else {
    res.statusCode = 404; // response: not found
    res.setHeader("Content-Type", "text/plain"); // we can send html, json and more
    res.end("404 not found");
  }
});

server.listen(port, hostname, () =>
  console.log(`Server listening on http://${hostname}:${port}`)
);
