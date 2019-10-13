const path = require('path');
const http = require('http');
const express = require('express');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const rxjs = require('rxjs');
const operators = require('rxjs/operators');
const { createStream: createDistanceStream } = require('./src/hcsr04');
const { createRotationStream } = require('./src/mpu6050');
/**
 * Constants
 */
const PORT = 8080;

/**
 * Setup logger
 */

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console()
  ]
});

/**
 * Setup Express
 */
const app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

/**
 * createDistanceStream
 */
const $distance = createDistanceStream({
  triggerGPIO: 27,
  echoGPIO: 17
});

const $rotation = createRotationStream();

/**
 * Setup Socket.IO
 */
const server = new http.Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  logger.info('User connected!');

  $distance.subscribe((value) => {
    socket.emit('distance', value);
  });

  $rotation.subscribe((value) => {
    socket.emit('rotation', value);
  });

  // socket.emit('news', { hello: 'world' });
  socket.on('control', function (data) {
    logger.debug(`Control: ${data}`);
  });

  socket.on('disconnect', function () {
    logger.info('User disconnected!');
  });
});

server.listen(PORT, () => logger.info(`App listening on port ${PORT}!`));
