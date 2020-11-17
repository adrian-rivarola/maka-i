import { MakaiGame, MakaiPlayer } from "../lib/makai";

import { createRoom, joinRoom, leaveRoom } from "./utils/room-actions";

import {
  setPlayerReady,
  setUsername,
  addBot,
  removeBot,
  gameEnded,
} from "./utils/game-actions";

export default function makaiHandler(io: SocketIO.Namespace) {
  io.on("connection", function (socket: PlayerSocket) {
    const username: string = socket.handshake.query.username || "";
    setUsername(socket, username);

    socket.on("setUsername", (username: string) =>
      setUsername(socket, username)
    );

    socket.on("createRoom", function (gameOptions: GameOptions) {
      const game = new MakaiGame(gameOptions);
      createRoom(socket, game);
    });

    socket.on("joinRoom", (id: string) => joinRoom(socket, id));

    socket.on("setReady", () => setPlayerReady(io, socket));

    socket.on("addBot", () => addBot(io, socket));

    socket.on("removeBot", () => removeBot(io, socket));

    socket.on("wantsCard", function (value: boolean) {
      const { game, player } = socket;
      if (!game || !player || player.hasPlayed) return;

      (player as MakaiPlayer).wantsCard = value;

      io.to(socket.roomId).emit("cardWanted", {
        playerName: socket.username,
        value,
      });

      game.bots.forEach((bot) => {
        socket.emit("cardWanted", {
          playerName: bot.name,
          value: (bot as MakaiPlayer).wantsCard,
        });
      });

      game.isRoundOver && gameEnded(io, game as MakaiGame);
    });

    socket.on("leaveRoom", () => leaveRoom(socket, io));
    socket.on("disconnect", () => leaveRoom(socket, io));
  });
}
