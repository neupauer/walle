const pigpio = require('pigpio');
const { Gpio } = pigpio;

const initMotor = (pinInput1, pinInput2, pinEnable) => {
  const motorInput1 = new Gpio(pinInput1, { mode: Gpio.OUTPUT });
  const motorInput2 = new Gpio(pinInput2, { mode: Gpio.OUTPUT });
  const motorEnable = new Gpio(pinEnable, { mode: Gpio.OUTPUT });
  return ({
    forward: () => {
      motorInput1.digitalWrite(0)
      motorInput2.digitalWrite(1)
      motorEnable.digitalWrite(1)
    },
    backward: () => {
      motorInput1.digitalWrite(1)
      motorInput2.digitalWrite(0)
      motorEnable.digitalWrite(1)
    },
    stop: () => {
      motorEnable.digitalWrite(0)
    },
    unexport: () => {
      // motorInput1.unexport()
      // motorInput2.unexport()
      // motorEnable.unexport()
    }
  })
}

const initCar = (motorLeft, motorRight) => {
  return ({
    forward: () => {
      motorLeft.forward();
      motorRight.forward();
    },
    left: () => {
      motorLeft.backward();
      motorRight.forward();
    },
    right: () => {
      motorLeft.forward();
      motorRight.backward();
    },
    backward: () => {
      motorLeft.backward();
      motorRight.backward();
    },
    stop: () => {
      motorLeft.stop();
      motorRight.stop();
    },
    unexport: () => {
      motorLeft.unexport()
      motorRight.unexport()
    }
  })
}

module.exports = {
  initMotor: initMotor,
  initCar: initCar
}
