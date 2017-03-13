var http = require('http');
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello, world from node!");
});
server.listen(3000);
console.log('Running Node app on port 3000.');