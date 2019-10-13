const i2c = require('i2c-bus');
const mpu6050 = require('i2c-mpu6050');

const rxjs = require('rxjs');
const operators = require('rxjs/operators');
const { defer, interval, bindNodeCallback, asyncScheduler } = rxjs;
const { share, switchMap } = operators;

const MPU6050_ADDR = 0x68;

const i2c1Bus = i2c.openSync(1);
const sensor = new mpu6050(i2c1Bus, MPU6050_ADDR);

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
    switchMap(() => bindNodeCallback(sensor.readTemp, null, asyncScheduler).call(sensor)),
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
  readInterval = 100
} = {}) => {
  return interval(readInterval).pipe(
    switchMap(() => bindNodeCallback(sensor.readRotation, null, asyncScheduler).call(sensor)),
    share()
  );
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
    switchMap(() => bindNodeCallback(sensor.readGyro, null, asyncScheduler).call(sensor)),
    share()
  );
})

/**
 * It creates data flow from the sensor rotation.
 *
 * @param {Object} [config] The configuration of the sensor.
 * @param {number} [config.readInterval=100] The interval at which the sensor reads the next value.
 * @param {number} [config.calibrateAccel] The interval at which the sensor reads the next value.
 *
 * @returns {rxjs.Observable}
 */
const createAccelStream = ({
  readInterval = 100,
  calibrateAccel = null
} = {}) => defer(() => {
  if (calibrateAccel) {
    sensor.calibrateAccel(calibrateAccel)
  }
  return interval(readInterval).pipe(
    switchMap(() => bindNodeCallback(sensor.readAccel, null, asyncScheduler).call(sensor)),
    share()
  );
})

module.exports = {
  createTempStream,
  createGyroStream,
  createAccelStream,
  createRotationStream,
}
