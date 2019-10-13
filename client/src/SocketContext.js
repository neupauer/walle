import React from "react";

import io from "socket.io-client";

const socket = io();
const SocketContext = React.createContext(socket);

export default SocketContext;
export {
  socket
}
