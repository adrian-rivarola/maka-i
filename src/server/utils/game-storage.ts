const ROOMS: RoomStorage = {};

export function getGame(nsp: string, roomId: string): Game | undefined {
  if (!ROOMS[nsp]) ROOMS[nsp] = {};

  return ROOMS[nsp][roomId];
}

export function saveGame(nsp: string, roomId: string, game: Game) {
  if (!ROOMS[nsp]) ROOMS[nsp] = {};

  game.roomId = roomId;
  ROOMS[nsp][roomId] = game;
}

export function deleteGame(nsp: string, roomId: string) {
  if (!ROOMS[nsp]) return;
  delete ROOMS[nsp][roomId];
}
