// server/index.js
'use strict';

const app = require('./server');

const PORT = normalizePort(process.env.PORT || '3030');

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
