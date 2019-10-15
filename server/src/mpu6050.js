const i2c = require('i2c-bus');
const mpu6050 = require('i2c-mpu6050');

const rxjs = require('rxjs');
const operators = require('rxjs/operators');
const { defer, interval, bindNodeCallback, Observable } = rxjs;
const { share, map, tap, scan, bufferCount, first, pairwise, switchMap } = operators;

const ALPHA = 0.05;
const MPU6050_ADDR = 0x68;

const i2c1Bus = i2c.openSync(1);
const sensor = new mpu6050(i2c1Bus, MPU6050_ADDR);
sensor.calibrateAccel({
  x: 0.11507,
  y: 0.04655,
  z: 0.07263
});

/**
 * It creates data flow from the sensor temp.
 *
 * @param {Object} [config] The configuration of the sensor.
 * @param {number} [config.readInterval=100] The interval at which the sensor reads the next value.
 *
 * @returns {rxjs.Observable}
 */
const createTempStream = ({
  readInterval = 100
} = {}) => {
  return interval(readInterval).pipe(
    switchMap(() => bindNodeCallback(sensor.readTemp).call(sensor)),
    share()
  );
}

/**
 * It creates data flow from the sensor rotation.
 *
 * @param {Object} [config] The configuration of the sensor.
 * @param {number} [config.readInterval=100] The interval at which the sensor reads the next value.
 *
 * @returns {rxjs.Observable}
 */
const createRotationStream = ({
  readInterval = 100,
} = {}) => {
  const observable$ = new Observable((subscriber) => {
    const intervalId = setInterval(() => {
      sensor.readRotation((err, data) => {
        if (err) subscriber.error(err);
        else subscriber.next(data);
      });
    }, readInterval);

    // Dispose the resources on unsubscribe
    return () => {
      clearInterval(intervalId);
    };
  });

  return observable$.pipe(
    pairwise(),
    // LPF-Low Pass Filter
    map(([prev, curr]) => ({
      x: curr.x * ALPHA + (prev.x * (1.0 - ALPHA)),
      y: curr.y * ALPHA + (prev.y * (1.0 - ALPHA))
    })),
    // Rounding
    map(({ x, y }) => ({
      x: Math.round(x),
      y: Math.round(y)
    })),
    share());
}

/**
 * It creates data flow from the sensor rotation.
 *
 * @param {Object} [config] The configuration of the sensor.
 * @param {number} [config.readInterval=100] The interval at which the sensor reads the next value.
 * @param {number} [config.calibrateGyro]
 *
 * @returns {rxjs.Observable}
 */
const createGyroStream = ({
  readInterval = 100,
  calibrateGyro = null
} = {}) => defer(() => {
  if (calibrateGyro) {
    sensor.calibrateGyro(calibrateGyro)
  }
  return interval(readInterval).pipe(
    switchMap(() => bindNodeCallback(sensor.readGyro).call(sensor)),
    share()
  );
})

/**
 * It creates data flow from the sensor rotation.
 *
 * @param {Object} [config] The configuration of the sensor.
 * @param {number} [config.readInterval=100] The interval at which the sensor reads the next value.
 *
 * @returns {rxjs.Observable}
 */
const createAccelStream = ({
  readInterval = 100,
} = {}) => {
  const observable$ = new Observable((subscriber) => {
    const intervalId = setInterval(() => {
      sensor.readAccel((err, data) => {
        if (err) subscriber.error(err);
        else subscriber.next(data);
      });
    }, readInterval);

    // Dispose the resources on unsubscribe
    return () => {
      clearInterval(intervalId);
    };
  });

  return observable$.pipe(
    pairwise(),
    // LPF-Low Pass Filter
    map(([prev, curr]) => ({
      x: curr.x * ALPHA + (prev.x * (1.0 - ALPHA)),
      y: curr.y * ALPHA + (prev.y * (1.0 - ALPHA)),
      z: curr.z * ALPHA + (prev.z * (1.0 - ALPHA)),
    })),
    // Rounding
    map(({ x, y, z }) => ({
      x: Math.round(x * 10000) / 1000,
      y: Math.round(y * 10000) / 1000,
      z: Math.round(z * 10000) / 1000,
    })),
    share());
}


module.exports = {
  createTempStream,
  createGyroStream,
  createAccelStream,
  createRotationStream,
}
