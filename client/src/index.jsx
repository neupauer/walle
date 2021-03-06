import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import _throttle from "lodash/throttle";
import Icon from "./Icon";
import Text from "./Components/Text";
import { socket } from "./SocketContext";
import ControlButton from "./Components/ControlButton";
import useKeyPress from "./utils/useKeyPress";

// Disable arrow key scrolling in users browser
window.addEventListener(
  "keydown",
  function(e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

const emitControl = direction => {
  socket.emit("control", direction);
};

const throttledEmitControl = _throttle(emitControl, 100);

const App = () => {
  const arrowUp = useKeyPress("ArrowUp");
  const arrowDown = useKeyPress("ArrowDown");
  const arrowRight = useKeyPress("ArrowRight");
  const arrowLeft = useKeyPress("ArrowLeft");

  const [buttonUp, setButtonUp] = useState(false);
  const [buttonDown, setButtonDown] = useState(false);
  const [buttonLeft, setButtonLeft] = useState(false);
  const [buttonRight, setButtonRight] = useState(false);

  const [xAngle, setXAngle] = useState(0);
  const [yAngle, setYAngle] = useState(0);
  const [frontDistance, setFrontDistance] = useState(0);
  const [rearDistance, setRearDistance] = useState(0);

  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    socket.on("rotation", msg => {
      setXAngle(msg.x);
      setYAngle(msg.y);
    });

    socket.on("distance_front", msg => {
      setFrontDistance(msg);
    });

    socket.on("distance_rear", msg => {
      setRearDistance(msg);
    });

    socket.on("velocity", msg => {
      setSpeed(Math.abs(Number(msg.x)));
    });
  }, []);

  if (arrowRight || buttonRight) {
    throttledEmitControl("RIGHT");
  } else if (arrowLeft || buttonLeft) {
    throttledEmitControl("LEFT");
  } else if (arrowUp || buttonUp) {
    throttledEmitControl("UP");
  } else if (arrowDown || buttonDown) {
    throttledEmitControl("DOWN");
  } else {
    throttledEmitControl("STOP");
  }

  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-1/2">
        <div className="px-4">
          <div className="mt-4">
            <Text category="c2">Controls</Text>
            <div className="flex items-center justify-center bg-gray-800 w-full h-64 mt-2 rounded-lg shadow-lg">
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <div className="w-1/3"></div>
                  <div className="w-1/3">
                    <ControlButton
                      active={arrowUp || buttonUp}
                      onMouseDown={() => setButtonUp(true)}
                      onMouseUp={() => setButtonUp(false)}
                      up
                    />
                  </div>
                  <div className="w-1/3"></div>
                </div>

                <div className="flex flex-row">
                  <div className="w-1/3">
                    <ControlButton
                      active={arrowLeft || buttonLeft}
                      onMouseDown={() => setButtonLeft(true)}
                      onMouseUp={() => setButtonLeft(false)}
                      left
                    />
                  </div>
                  <div className="w-1/3">
                    <ControlButton
                      active={arrowDown || buttonDown}
                      onMouseDown={() => setButtonDown(true)}
                      onMouseUp={() => setButtonDown(false)}
                      down
                    />
                  </div>
                  <div className="w-1/3">
                    <ControlButton
                      active={arrowRight || buttonRight}
                      onMouseDown={() => setButtonRight(true)}
                      onMouseUp={() => setButtonRight(false)}
                      right
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Text category="c2">Speed</Text>
            <div className="flex items-center justify-center bg-gray-100 w-full h-64 mt-2 rounded-lg shadow-lg">
              <svg
                className="stroke-current text-gray-600 h-16 w-16"
                version="1.1"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke-linecap="round"
                  stroke-width="1"
                  stroke-linejoin="round"
                >
                  <path d="M20.1317,3.86827c4.49103,4.49103 4.49103,11.7724 0,16.2635c-4.49103,4.49103 -11.7724,4.49103 -16.2635,0c-4.49103,-4.49103 -4.49103,-11.7724 0,-16.2635c4.49103,-4.49103 11.7724,-4.49103 16.2635,0"></path>
                  <path d="M13.414,13.414l2.05407e-08,-1.98388e-08c-0.794504,0.767357 -2.06064,0.745351 -2.828,-0.0491528c-0.748565,-0.775046 -0.748565,-2.0038 -3.96777e-08,-2.77885c0.781,-0.781 8.132,-5.3 8.132,-5.3c0,0 -4.518,7.347 -5.304,8.128Z"></path>
                  <path d="M3.5,12h1.5"></path>
                  <path d="M5.99,5.99l1.06,1.06"></path>
                  <path d="M12,3.5v1.5"></path>
                  <path d="M20.5,12h-1.5"></path>
                  <path d="M20.633,19.6l-4.06265e-07,-2.8036e-07c-2.53452,-1.74905 -5.55411,-2.65846 -8.633,-2.6l8.66663e-07,1.64554e-08c-3.07889,-0.0584594 -6.09848,0.850948 -8.633,2.6"></path>
                </g>
              </svg>
              <Text
                category="s2"
                className="text-indigo-500 font-mono font-bold w-32 text-center"
                style={{ textAlign: "center" }}
              >
                {speed.toFixed(2)}
                <span className="text-sm font-normal">m/s</span>
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="px-4">
          <div className="mt-4">
            <Text category="c2">Rotation Sensors</Text>
            <div className="flex justify-around bg-gray-100 w-full h-64 mt-2 rounded-lg shadow-lg">
              <div className=" flex flex-col items-center justify-center">
                <Text category="c1">Roll</Text>
                <Icon.Car
                  className="text-gray-600 h-24 w-24 my-2"
                  style={{ transform: `rotate(${-xAngle}deg) scale(0.75)` }}
                />
                <Text
                  category="s2"
                  className="text-indigo-500 font-mono font-bold"
                >
                  {xAngle.toFixed(2)}
                  <span className="font-normal">º</span>
                </Text>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Text category="c1">Pitch</Text>
                <Icon.Car2
                  className="text-gray-600 h-24 w-24 my-2"
                  style={{ transform: `rotate(${-yAngle}deg)` }}
                  strokeWidth={0.75}
                />
                <Text
                  category="s2"
                  className="text-indigo-500 font-mono font-bold"
                >
                  {yAngle.toFixed(2)}
                  <span className="font-normal">º</span>
                </Text>
              </div>
            </div>

            <div className="mt-4">
              <Text category="c2">Distance Sensors</Text>
              <div className="flex justify-around bg-gray-100 w-full h-64 mt-2 rounded-lg shadow-lg">
                <div className="flex flex-col items-center justify-center">
                  <Text category="c1">Distance</Text>
                  <div className="flex items-center">
                    <Text
                      category="s2"
                      className={`${
                        rearDistance < 30 ? "text-red-400" : "text-indigo-500"
                      } font-mono font-bold w-32 text-center`}
                      style={{ textAlign: "center" }}
                    >
                      {rearDistance.toFixed(2)}
                      <span className="text-sm font-normal">cm</span>
                    </Text>
                    <Icon.Car2
                      className="text-gray-600 h-24 w-24 mx-4 md:mx-12"
                      strokeWidth={0.75}
                    />
                    <Text
                      category="s2"
                      className={`${
                        frontDistance < 30 ? "text-red-400" : "text-indigo-500"
                      } font-mono font-bold w-32 text-center`}
                      style={{ textAlign: "center" }}
                    >
                      {frontDistance.toFixed(2)}
                      <span className="text-sm font-normal">cm</span>
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Text category="c2">Camera</Text>
            <div className="flex items-center justify-center bg-gray-800 w-full h-64 mt-2 rounded-lg shadow-lg">
              <Icon.Camera className="text-gray-600 h-32 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("app"));
