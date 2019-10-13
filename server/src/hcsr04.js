const pigpio = require('pigpio');
const { Gpio } = pigpio;

const rxjs = require('rxjs');
const operators = require('rxjs/operators');
const { defer, fromEvent } = rxjs;
const { bufferCount, filter, map, skip, share, finalize } = operators;

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6 / 34321;

/**
 * It creates data flow from the sensor.
 * It returns an stream (observable) of numbers,
 * where each number represents distance in `cm`.
 *
 * @param {Object} config The configuration of the sensor.
 * @param {number} config.triggerGPIO The number of the trigger GPIO pin on the board.
 * @param {number} config.echoGPIO The number of the echo GPIO pin on the board.
 * @param {number} [config.readInterval=100] The interval at which the sensor reads the next value.
 * @param {number} [config.rounding=4] Rounding of returned values
 *
 * @returns {rxjs.Observable}
 */
const createStream = ({
  triggerGPIO,
  echoGPIO,
  readInterval = 100,
  rounding = 4,
}) => {
  const trigger = new Gpio(triggerGPIO, { mode: Gpio.OUTPUT });
  const echo = new Gpio(echoGPIO, { mode: Gpio.INPUT, alert: true });

  trigger.digitalWrite(0); // Make sure trigger is low

  const $source = defer(() => {
    const interval = setInterval(() => {
      trigger.trigger(10, 1); // Set trigger high for 10 microseconds
    }, readInterval || 100);

    // @ts-ignore
    return fromEvent(echo, 'alert').pipe(
      bufferCount(2), // group by start (level 1) tick and end tick (level 0)
      map(([triggerAlert, echoAlert]) => (echoAlert[1] >> 0) - (triggerAlert[1] >> 0)), // returns diff between 2 ticks
      filter(diff => diff > 10 && diff < 100000), // If the diff between two ticks are too close or too far then it is probably a reading error
      map(diff => +(diff / 2 / MICROSECDONDS_PER_CM).toFixed(rounding || 4)),
      skip(1), // skip first
      share(),
      finalize(() => clearInterval(interval)),
    );
  });

  return $source;
}

module.exports = {
  createStream
}
