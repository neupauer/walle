const path = require('path');
const http = require('http');
const express = require('express');
const _throttle = require('lodash/throttle');
const { throttleTime } = require('rxjs/operators');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const { createStream } = require('./src/hcsr04');
const { createRotationStream } = require('./src/mpu6050');
const { initMotor, initCar } = require('./src/dc_motor');

/**
 * Constants
 */
const PORT = +(process.env.PORT) || 8080;

/**
 * Setup logger
 */
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: 'debug',
  // level: 'info',
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
 * Setup sensors
 */
let frontDistance = 0;
const $distanceFront = createStream({
  triggerGPIO: 26,
  echoGPIO: 19,
  readInterval: 50
});

let rearDistance = 0;
const $distanceRear = createStream({
  triggerGPIO: 17,
  echoGPIO: 27,
  readInterval: 50
});

const $rotation = createRotationStream();

/**
 * Setup car
 */

const motorLeft = initMotor(24, 23, 25);
const motorRight = initMotor(21, 20, 16);

const car = initCar(motorLeft, motorRight);

/**
 * Setup Socket.IO
 */
const server = new http.Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  const emitDistance = (direction, distance) => {
    socket.emit(direction, distance);
  };

  logger.info('User connected!');

  $distanceFront.pipe(throttleTime(0)).subscribe((value) => {
    frontDistance = value;
    if (value < 25) {
      car.stop();
    }

    _throttle(emitDistance, 500)('distance_front', value);
  });

  $distanceRear.pipe(throttleTime(0)).subscribe((value) => {
    rearDistance = value;
    if (value < 25) {
      car.stop();
    }

    _throttle(emitDistance, 500)('distance_rear', value);
  });

  $rotation.pipe(throttleTime(500)).subscribe((value) => {
    socket.emit('rotation', value);
  });

  socket.on('control', function (data) {
    logger.debug(`Control: ${data}`);

    switch (data) {
      case "UP":
        if (frontDistance > 30) {
          car.forward();
        } else {
          car.stop();
        }
        break;
      case "DOWN":
        if (rearDistance > 30) {
          car.backward();
        } else {
          car.stop();
        }
        break;
      case "LEFT":
        car.left();
        break;
      case "RIGHT":
        car.right();
        break;
      case "STOP":
      default:
        car.stop();
        break;
    }
  });

  socket.on('disconnect', function () {
    logger.info('User disconnected!');
  });
});

server.listen(PORT, () => logger.info(`App listening on port ${PORT}!`));

process.on('exit', function () {
  car.stop();
  car.unexport();
});

process.on('uncaughtException', function (err) {
  logger.error(err);
});
