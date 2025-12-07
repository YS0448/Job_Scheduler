// import { io } from "socket.io-client";

// // export const socket = io(`${import.meta.env.VITE_API_URL}`, {
// export const socket = io("http://localhost:7800", {
//   transports: ["websocket", "polling"],
//   withCredentials: true,
//   autoConnect: true
// });

// socket.on("connect", () => {
//   console.log("Socket connected:", socket.id);
// });

// socket.on("connect_error", (err) => {
//   console.error("Socket connection error:", err);
// });


import { io } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:7800";

console.log("═══════════════════════════════════════");
console.log("🔌 Socket.IO Client Initialization");
console.log("═══════════════════════════════════════");

export const socket = io(apiUrl, {
    transports: ["polling", "websocket"],
    withCredentials: true,
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 10000
});

socket.on("connect", () => {
    console.log("✅ SOCKET CONNECTED");
    console.log("   Socket ID:", socket.id);
    console.log("   Transport:", socket.io.engine.transport.name);
});

socket.on("connect_error", (err) => {
    console.error("❌ CONNECTION ERROR");
    console.error("   Message:", err.message);
    console.error("   Type:", err.type);
    console.error("   Description:", err.description);
});

socket.on("disconnect", (reason) => {
    console.log("🔌 DISCONNECTED");
    console.log("   Reason:", reason);
});

socket.io.on("reconnect", (attempt) => {
    console.log("🔄 RECONNECTED after", attempt, "attempts");
});

socket.io.on("reconnect_attempt", (attempt) => {
    console.log("🔄 Reconnection attempt #" + attempt);
});

socket.io.on("reconnect_error", (error) => {
    console.error("❌ RECONNECTION ERROR:", error.message);
});

socket.io.on("reconnect_failed", () => {
    console.error("❌ RECONNECTION FAILED - Giving up");
});
