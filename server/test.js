const { createVelocityStream } = require('./src/mpu6050');

createVelocityStream().subscribe(value => console.log(value));
