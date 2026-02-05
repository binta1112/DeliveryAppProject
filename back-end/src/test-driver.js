// test-driver.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { transports: ["websocket"] });

setInterval(() => {
  socket.emit("driver_location", { orderId: "123", lat: 33.59, lng: -7.62, ts: Date.now() });
}, 2000);
