import { createRandomName, log } from "./index";

export function setUsername(socket: PlayerSocket, username: string) {
  username = username.trim() || createRandomName();

  socket.username = username;
  socket.join(username);
  socket.emit("userConnected", socket.username);
}

export function setPlayerReady(io: SocketIO.Namespace, socket: PlayerSocket) {
  const { player, game } = socket;
  if (!player || !game) return;

  if (game.isPlaying) return;

  player.isReady = true;
  io.to(game.roomId).emit("playerReady", socket.username);

  log(`[${socket.roomId}] ${socket.username} is ready`);

  game.canStart && startGame(io, game);
}

export function addBot(io: SocketIO.Namespace, socket: PlayerSocket) {
  const { game } = socket;

  if (!game) return;

  const gameAdmin = game.players.find((player) => !player.isBot);

  if (!game.canAddBot || gameAdmin.name !== socket.username)
    return socket.emit("errorMsg", "You cannot add more bots to the game");

  const bot = game.addBot();
  log(`[${socket.roomId}] ${bot.name} added`);

  io.to(game.roomId).emit("playerJoined", bot.getInfo());

  game.canStart && startGame(io, game);
}

export function removeBot(io: SocketIO.Namespace, socket: PlayerSocket) {
  const { game } = socket;

  if (!game?.hasBots || socket.username !== game?.players[0].name)
    return socket.emit("errorMsg", "You cannot remove a bot from the game");

  const botRemoved = game.removeBot();
  botRemoved && io.to(game.roomId).emit("playerLeft", botRemoved.getInfo());
}

export function startGame(io: SocketIO.Namespace, game: Game) {
  game.startRound();
  io.to(game.roomId).emit("roundStarted");

  game.players.forEach((player) => {
    io.to(player.name).emit("updateCards", player.cards);
  });

  log(`[${game.roomId}] Dealing cards...`);
}

export function gameEnded(io: SocketIO.Namespace, game: Game) {
  game.roundEnded();

  io.to(game.roomId).emit("gameResults", game.results);

  log(`[${game.roomId}] Round #${game.info.roundsPlayed} ended`);
}
