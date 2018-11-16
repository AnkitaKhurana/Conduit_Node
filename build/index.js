"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var server_1 = require("./server");
//Set port by environment variable or port number 
var port = normalizePort(process.env.PORT || 3000);
server_1.default.set('port', port);
// create http server 
var server = http.createServer(server_1.default);
// Port listener 
server.listen(port);
console.log('listening... on port ', port);
// Port error Events Listener
server.on('error', onError);
// port normalisation 
function normalizePort(val) {
    var port = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    }
    else if (port >= 0) {
        return port;
    }
    else {
        return false;
    }
}
// Event onError Handler
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
//# sourceMappingURL=index.js.map