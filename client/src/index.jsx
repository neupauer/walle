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
  function (e) {
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
      console.log("VEL", msg);
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
            <Text category="c2">Camera</Text>
            <div className="flex items-center justify-center bg-gray-800 w-full h-64 mt-2 rounded-lg shadow-lg">
              <Icon.Camera className="text-gray-600 h-32 w-32" />
              <span>36km/h</span>
            </div>
          </div>

        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="px-4">
          <div className="mt-4">
            <Text category="c2">Sensors</Text>
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

            <div className="flex justify-around bg-gray-100 w-full h-64 mt-6 rounded-lg shadow-lg">
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
