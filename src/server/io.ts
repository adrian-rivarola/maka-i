import socketio from "socket.io";
import makaiHandler from "./makai-events";

export default function ioSetup(server: any) {
  const io = socketio(server);
  makaiHandler(io.of("/makai"));
}
