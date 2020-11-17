import * as io from "socket.io-client";
import { assert } from "chai";
import "mocha";

import server from "../src/server";

const PORT = process.env.PORT || 5000;
const URL = `http://localhost:${PORT}/makai`;

let client1: SocketIOClient.Socket, client2: SocketIOClient.Socket;

interface RoomInfo {
  game: GameInfo;
  players: PlayerInfo[];
}

interface CardWantedEv {
  playerName: string;
  value: boolean;
}

describe("Makai-events", function () {
  before((done) => server.listen(PORT, done));
  after(() => server.close());

  before("connect client1", function (done) {
    client1 = io.connect(URL, { query: { username: "tester1" } });
    client1.on("connect", done);
  });

  before("connect client2", function (done) {
    client2 = io.connect(URL, { query: { username: "tester2" } });
    client2.on("connect", done);
  });

  after("disconnect clients", function () {
    client1.disconnect();
    client2.disconnect();
  });

  describe("play round", function () {
    before("create game", function (done) {
      client2.once("roomInfo", () => done());

      client1.once("roomInfo", (info: RoomInfo) => {
        client2.emit("joinRoom", info.game.roomId);
      });

      client1.emit("createRoom", {
        maxPlayers: 2,
        allowBots: true,
      });
    });

    it("roundStarted event", function (done) {
      client2.once("roundStarted", () => done());

      client1.emit("setReady");
      client2.emit("setReady");
    });

    it("cardWanted event", function (done) {
      client1.once("cardWanted", function ({ value }: CardWantedEv) {
        assert.isOk(value);

        done();
      });

      client1.emit("wantsCard", true);
    });

    it("roundEnded event", function (done) {
      client1.once("gameResults", function ({ winner, players }: GameResult) {
        assert.equal(winner.gamesWon, 1);

        assert.equal(players[0].cards.length, 3);
        assert.equal(players[1].cards.length, 2);

        done();
      });

      client2.emit("wantsCard", false);
    });
  });
});
