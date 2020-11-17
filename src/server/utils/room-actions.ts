import { getGame, saveGame, deleteGame } from "./game-storage";
import { gameEnded } from "./game-actions";
import { createRandomId, log } from "./index";

export function createRoom(socket: PlayerSocket, game: Game) {
  let roomId = createRandomId(),
    nsp = socket.nsp.name;

  log(`[${roomId}] Room created`);

  saveGame(nsp, roomId, game);
  joinRoom(socket, roomId);
}

export function joinRoom(socket: PlayerSocket, roomId: string) {
  const nsp = socket.nsp.name,
    game = getGame(nsp, roomId);

  if (!game) return socket.emit("errorMsg", `Room "${roomId}" does not exists`);

  const [canJoin, error] = game.canPlayerJoin(socket.username);
  if (!canJoin) return socket.emit("errorMsg", error);

  let player = game.addPlayer(socket.username);

  socket.roomId = roomId;
  socket.player = player;
  socket.game = game;

  socket.join(roomId);
  socket.emit("roomInfo", {
    game: game.info,
    players: game.playersInfo,
    myInfo: player.getInfo(true),
  });

  socket.to(roomId).emit("playerJoined", player.getInfo());

  log(`[${game.roomId}] ${socket.username} joined`);
}

export function leaveRoom(socket: PlayerSocket, io: SocketIO.Namespace) {
  const { game, player, roomId } = socket;

  if (!game || !player || !roomId) return;

  if (game.hasStarted) {
    player.isBot = true;
  } else {
    game.removePlayer(player.name);
  }
  
  socket.to(roomId).emit("playerLeft", socket.username);
  socket.leave(roomId);

  socket.game = socket.player = socket.roomId = undefined;
  log(`[${roomId}] ${socket.username} left`);
  
  game.isRoundOver && gameEnded(io, game);

  if (game.isEmpty) {
    deleteGame(socket.nsp.name, roomId);
    log(`[${roomId}] room deleted`);
  }
}
