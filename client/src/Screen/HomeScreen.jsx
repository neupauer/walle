import React, { useEffect } from "react";
import CarIcon from "../CarIcon";

const MyDiv = ({}) => {
  return <div className="w-1 h-16 bg-gray-400 mx-2"></div>;
};

const HomeScreen = ({}) => {

  useEffect(() => {})
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <MyDiv />
      <MyDiv />
      <MyDiv />
      <MyDiv />
      <MyDiv />
      <CarIcon className="stroke-current text-indigo-800 h-24 w-24 mx-4" />
      <MyDiv />
      <MyDiv />
      <MyDiv />
      <MyDiv />
      <MyDiv />
    </div>
  );
};

export default HomeScreen;

// document.addEventListener('keydown', function(event) {
//   console.log("D", event.code, event.key);
// });

// document.addEventListener('keyup', function(event) {
//   console.log("U", event.code, event.key);
// });

var command = {
  FORWARD: "FORWARD",
  BACKWARD: "BACKWARD",
  RIGHT: "RIGHT",
  LEFT: "LEFT",
  STOP: "STOP"
};
var allowedCodes = [
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "ArrowUp",
  "ArrowDown",
  "ArrowRight",
  "ArrowLeft",
  "Space"
];

let keysState = {};

var mapCodeToCommand = e => {
  if (e.code == "Space") {
    return command.STOP;
  }

  if (e.type == "keyup") {
    if (keysState.hasOwnProperty("ArrowUp") && keysState["ArrowUp"]) {
      return command.FORWARD;
    } else if (
      keysState.hasOwnProperty("ArrowDown") &&
      keysState["ArrowDown"]
    ) {
      return command.BACKWARD;
    } else if (
      keysState.hasOwnProperty("ArrowLeft") &&
      keysState["ArrowLeft"]
    ) {
      return command.LEFT;
    } else if (
      keysState.hasOwnProperty("ArrowRight") &&
      keysState["ArrowRight"]
    ) {
      return command.RIGHT;
    }
    return command.STOP;
  }

  switch (e.code) {
    case "KeyW":
    case "ArrowUp":
      return command.FORWARD;
    case "KeyS":
    case "ArrowDown":
      return command.BACKWARD;
    case "KeyA":
    case "ArrowLeft":
      return command.LEFT;
    case "KeyD":
    case "ArrowRight":
      return command.RIGHT;
    default:
      return command.STOP;
  }
};

const $keydown = rxjs.fromEvent(document, "keydown");
const $keyup = rxjs.fromEvent(document, "keyup");

$keydown
  .pipe(
    rxjs.operators.map(e => e.code),
    rxjs.operators.filter(code => allowedCodes.indexOf(code) !== -1)
  )
  .subscribe(code => (keysState[code] = true));

$keyup
  .pipe(
    rxjs.operators.map(e => e.code),
    rxjs.operators.filter(code => allowedCodes.indexOf(code) !== -1)
  )
  .subscribe(code => (keysState[code] = false));

const $keydownAndKeyup = rxjs
  .merge($keydown, $keyup)
  .pipe(
    rxjs.operators.map(e => ({
      code: e.code,
      type: e.type
    })),
    rxjs.operators.filter(e => allowedCodes.indexOf(e.code) !== -1),
    rxjs.operators.map(mapCodeToCommand),
    rxjs.operators.distinctUntilChanged()
  )
  .subscribe(cmd => {
    console.log("command:", cmd);
    socket.emit("command", cmd);
  });

// rxjs.fromEvent(document, "keyup").pipe(
//   rxjs.operators.throttleTime(100),
//   rxjs.operators.map(e => e.key),
//   rxjs.operators.filter(key => allowedKeys.indexOf(key) !== -1)
// ).subscribe((e) => console.log('UP:', e));

// rxjs.fromEvent(document, "keydown").subscribe((e) => console.log('Clicked!', e.key));

// document.getElementById("up").addEventListener("click", function() {
//   socket.emit('message', "UP");
// });
