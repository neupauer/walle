const i2c = require('i2c-bus');
const MPU6050 = require('i2c-mpu6050');

const { defer, interval, bindNodeCallback, Observable } = require('rxjs');
const { share, map, tap, scan, bufferCount, first, pairwise } = require('rxjs/operators');
const _mean = require('lodash/mean');
const _sum = require('lodash/sum');

const MPU6050_ADDR = 0x68;

const ALPHA = 0.05;

const i2c1Bus = i2c.openSync(1);

const sensor = new MPU6050(i2c1Bus, MPU6050_ADDR);
sensor.calibrateAccel({
  x: 0.11507,
  y: 0.04655,
  z: 0.07263
});

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
