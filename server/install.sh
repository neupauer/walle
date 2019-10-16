#!/usr/bin/env bash

sudo apt-get update

# Enable/Install I2C
# @see https://skpang.co.uk/blog/archives/575
# @see https://learn.adafruit.com/adafruits-raspberry-pi-lesson-4-gpio-setup/configuring-i2c
sudo apt-get install -y i2c-tools
sudo usermod -G i2c pi

# Enable/Install pigpio
sudo apt-get install -y pigpio python-pigpio python3-pigpio
sudo usermod -G gpio pi

# Install Node
wget https://nodejs.org/dist/v10.16.3/node-v10.16.3-linux-armv7l.tar.xz
tar xf ./node-v10.16.3-linux-armv7l.tar.xz
sudo mv ./node-v10.16.3-linux-armv7l /usr/local/node-v10.16.3-linux-armv7l
echo "export PATH=/usr/local/node-v10.16.3-linux-armv7l/bin:$PATH" >> /home/pi/.bashrc
rm -rf ./node-v10.16.3-linux-armv7l.tar.xz
