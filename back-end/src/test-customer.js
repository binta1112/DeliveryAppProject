// test-customer.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { transports: ["websocket"] });

socket.emit("join_order", { orderId: "123" });

socket.on("driver_location_update", (data) => {
  console.log("UPDATE:", data);
});
