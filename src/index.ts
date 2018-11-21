const http = require("http");
import Server from "./server";

//Set port by environment variable or port number
const port = normalizePort(process.env.PORT || 3000);
Server.set("port", port);

// create http server
const server = http.createServer(Server);

// Port listener
server.listen(port);
console.log("listening... on port ", port);

// Port error Events Listener
server.on("error", onError);

// port normalisation
function normalizePort(val: number | string): number | string | boolean {
  const port: number = typeof val === "string" ? parseInt(val, 10) : val;
  if (isNaN(port)) {
    return val;
  } else if (port >= 0) {
    return port;
  } else {
    return false;
  }
}

// Event onError Handler
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
