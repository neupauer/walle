import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import Icon from "./Icon";
import Text from "./Components/Text";
import { socket } from "./SocketContext";
import ControlButton from "./Components/ControlButton";
import useKeyPress from "./utils/useKeyPress";

const App = () => {
  const arrowUp = useKeyPress("ArrowUp");
  const arrowDown = useKeyPress("ArrowDown");
  const arrowRight = useKeyPress("ArrowRight");
  const arrowLeft = useKeyPress("ArrowLeft");

  const [xAngle, setXAngle] = useState(0);
  const [yAngle, setYAngle] = useState(0);
  const [frontDistance, setFrontDistance] = useState(0);
  const [rearDistance, setRearDistance] = useState(0);

  useEffect(() => {
    socket.on("rotation", msg => {
      setXAngle(msg.x);
      setYAngle(msg.y);
    });

    socket.on("distance", msg => {
      setFrontDistance(msg.front);
      setRearDistance(msg.rear);
    });
  }, []);

  if (arrowRight) {
    socket.emit("control", "RIGHT");
  } else if (arrowLeft) {
    socket.emit("control", "LEFT");
  } else if (arrowUp) {
    socket.emit("control", "UP");
  } else if (arrowDown) {
    socket.emit("control", "DOWN");
  } else {
    socket.emit("control", "STOP");
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
                    <ControlButton active={arrowUp} transform="rotate(0)" />
                  </div>
                  <div className="w-1/3"></div>
                </div>

                <div className="flex flex-row">
                  <div className="w-1/3">
                    <ControlButton active={arrowLeft} transform="rotate(-90)" />
                  </div>
                  <div className="w-1/3">
                    <ControlButton active={arrowDown} transform="rotate(180)" />
                  </div>
                  <div className="w-1/3">
                    <ControlButton active={arrowRight} transform="rotate(90)" />
                  </div>
                </div>
              </div>
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
                  style={{ transform: `rotate(${xAngle}deg) scale(0.75)` }}
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
                  style={{ transform: `rotate(${yAngle}deg)` }}
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
                    className="text-indigo-500 font-mono font-bold"
                  >
                    {rearDistance.toFixed(2)}
                    <span className="text-sm font-normal">cm</span>
                  </Text>
                  <Icon.Car2
                    className="text-gray-600 h-24 w-24 mx-12"
                    strokeWidth={0.75}
                  />
                  <Text
                    category="s2"
                    className="text-indigo-500 font-mono font-bold"
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