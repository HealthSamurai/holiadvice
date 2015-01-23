var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(serveStatic(__dirname + "/build")).listen(8080, "0.0.0.0");
