// const i2c = require('i2c-bus');
// const mpu6050 = require('i2c-mpu6050');

const rxjs = require('rxjs');
const operators = require('rxjs/operators');
const { defer, interval, bindNodeCallback, Observable } = rxjs;
const { share, switchMap } = operators;
const createAccel = () => {
  const rotation$ = new Observable(subscriber => {

    const readSensorData = () => {
      sensor.readRotation((err, data) => {
        if (err) {
          subscriber.error(err);
        } else {
          subscriber.next(data);
        }
      });
    }

    const intervalId = setInterval(readSensorData, 1000);

    // dispose the resources
    return () => {
      clearInterval(intervalId);
    };
  });

  return rotation$.pipe(share());
}

// rotation$.subscribe().unsubscribe()



// const MPU6050_ADDR = 0x68;

// const i2c1Bus = i2c.openSync(1);
// const sensor = new mpu6050(i2c1Bus, MPU6050_ADDR);

// /**
//  * It creates data flow from the sensor rotation.
//  *
//  * @param {Object} [config] The configuration of the sensor.
//  * @param {number} [config.readInterval=100] The interval at which the sensor reads the next value.
//  *
//  * @returns {rxjs.Observable}
//  */
// const createRotationStream = ({
//   readInterval = 100
// } = {}) => {
//   return interval(readInterval).pipe(
//     switchMap(() => bindNodeCallback(sensor.readRotation).call(sensor)),
//     share()
//   );
// }

// /**
//  * It creates data flow from the sensor rotation.
//  *
//  * @param {Object} [config] The configuration of the sensor.
//  * @param {number} [config.readInterval=100] The interval at which the sensor reads the next value.
//  * @param {number} [config.calibrateGyro]
//  *
//  * @returns {rxjs.Observable}
//  */
// const createGyroStream = ({
//   readInterval = 100,
//   calibrateGyro = null
// } = {}) => defer(() => {
//   if (calibrateGyro) {
//     sensor.calibrateGyro(calibrateGyro)
//   }
//   return interval(readInterval).pipe(
//     switchMap(() => bindNodeCallback(sensor.readGyro).call(sensor)),
//     share()
//   );
// })

// /**
//  * It creates data flow from the sensor rotation.
//  *
//  * @param {Object} [config] The configuration of the sensor.
//  * @param {number} [config.readInterval=100] The interval at which the sensor reads the next value.
//  * @param {number} [config.calibrateAccel] The interval at which the sensor reads the next value.
//  *
//  * @returns {rxjs.Observable}
//  */
// const createAccelStream = ({
//   readInterval = 100,
//   calibrateAccel = null
// } = {}) => defer(() => {
//   if (calibrateAccel) {
//     sensor.calibrateAccel(calibrateAccel)
//   }
//   return interval(readInterval).pipe(
//     switchMap(() => bindNodeCallback(sensor.readAccel).call(sensor)),
//     share()
//   );
// })

// module.exports = {
//   createTempStream,
//   createGyroStream,
//   createAccelStream,
//   createRotationStream,
// }
