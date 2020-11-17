import * as io from "socket.io-client";
import { assert } from "chai";
import "mocha";

import server from "../src/server";

interface RoomInfo {
  game: GameInfo;
  players: PlayerInfo[];
}

const PORT = process.env.PORT || 5000;
const URL = `http://localhost:${PORT}/makai`;

let client1: SocketIOClient.Socket,
  client2: SocketIOClient.Socket,
  client3: SocketIOClient.Socket;

describe("SERVER", function () {
  before((done) => server.listen(PORT, done));
  after(() => server.close());

  describe("user", function () {
    afterEach("disconnect client", function () {
      client1.disconnect();
    });

    it("can connect", function (done) {
      client1 = io.connect(URL);
      client1.once("connect", done);
    });

    describe("set username", function () {
      it("user gets a default username", function (done) {
        client1 = io.connect(URL);
        client1.once("userConnected", function (name: string) {
          assert.isAtLeast(name.length, 10);
          assert.equal(name.substr(0, 7), "Player#");
          done();
        });
      });

      it("with the connection query", function (done) {
        client1 = io.connect(URL, {
          query: { username: "tester1" },
        });
        client1.once("userConnected", function (name: string) {
          assert.equal(name, "tester1");
          done();
        });
      });

      it("with 'setUsername' event", function (done) {
        client1 = io.connect(URL);

        client1.once("userConnected", function () {
          client1.once("userConnected", function (name: string) {
            assert.equal(name, "tester1");
            done();
          });

          client1.emit("setUsername", "tester1");
        });
      });
    });
  });

  describe("rooms", function () {
    const roomOptions: GameOptions = {
      roomId: "",
      allowBots: true,
      maxPlayers: 2,
    };

    before("connect client1 with name 'tester1'", function (done) {
      client1 = io.connect(URL, { query: { username: "tester1" } });
      client1.on("connect", done);
    });
    before("connect client2 with name 'tester2'", function (done) {
      client2 = io.connect(URL, { query: { username: "tester2" } });
      client2.on("connect", done);
    });
    before("connect client3 wit name 'tester3'", function (done) {
      client3 = io.connect(URL, { query: { username: "tester3" } });
      client3.once("connect", done);
    });

    after("disconnect all clients", function () {
      client1.disconnect();
      client2.disconnect();
      client3.disconnect();

      roomOptions.roomId = "";
    });

    describe("create room", function () {
      it("user can create a room", function (done) {
        client1.once("roomInfo", function (info: RoomInfo) {
          const { game, players } = info;

          assert.equal(game.roundsPlayed, 0);
          assert.equal(game.maxPlayers, 2);
          assert.isOk(game.allowBots);

          assert.equal(players.length, 1);

          const player = players[0];
          assert.equal(player.name, "tester1");

          assert.isNotOk(player.isBot);
          assert.isNotOk(player.isReady);

          roomOptions.roomId = game.roomId;
          done();
        });
        client1.emit("createRoom", roomOptions);
      });
    });

    describe("join room", function () {
      it("user gets message if room does not exists", function (done) {
        client2.once("errorMsg", function (msg: string) {
          assert.equal(msg, 'Room "12345" does not exists');
          done();
        });
        client2.emit("joinRoom", "12345");
      });

      it("user gets update when other user joins", function (done) {
        client1.once("playerJoined", function (player: PlayerInfo) {
          assert.equal(player.name, "tester2");
          done();
        });

        client2.emit("joinRoom", roomOptions.roomId);
      });

      it("user gets message if room is full", function (done) {
        client3.once("errorMsg", function (msg: string) {
          assert.equal(msg, `Game "${roomOptions.roomId}" is full`);
          done();
        });

        client3.once("roomInfo", function () {
          assert.isOk(false);
          done();
        });

        client3.emit("joinRoom", roomOptions.roomId);
      });

      it("client can set it's state to 'Ready'", function (done) {
        client1.once("playerReady", function (username: string) {
          assert.equal(username, "tester1");
          done();
        });
        client1.emit("setReady");
      });
    });

    describe("leave room", function () {
      it("user gets update when someone leaves the room", function (done) {
        client1.once("playerLeft", function (playerName: string) {
          assert.equal(playerName, "tester2");

          done();
        });
        client2.emit("leaveRoom");
      });

      it("room gets deleted when all players leave", function (done) {
        client1.once("errorMsg", function (msg: string) {
          assert.equal(msg, `Room "${roomOptions.roomId}" does not exists`);
          done();
        });

        client1.once("roomInfo", () => {
          assert(false);
          done();
        });

        client1.emit("leaveRoom");

        setTimeout(() => client1.emit("joinRoom", roomOptions.roomId), 150);
      });
    });
  });

  describe("Bots", function () {
    const roomOptions: GameOptions = {
      roomId: "",
      allowBots: true,
      maxPlayers: 3,
    };

    before("conect clients", function (done) {
      client1 = io.connect(URL, { query: { username: "tester1" } });
      client2 = io.connect(URL, { query: { username: "tester2" } });
      client3 = io.connect(URL, { query: { username: "tester3" } });
      setTimeout(done, 300);
    });

    before("add 2 clients to a room", function (done) {
      client2.once("roomInfo", () => done());

      client1.once("roomInfo", function ({ game }: RoomInfo) {
        client2.emit("joinRoom", game.roomId);
        roomOptions.roomId = game.roomId;
      });

      client1.emit("createRoom", roomOptions);
    });
    after("disconnect clients", function () {
      client1.disconnect();
      client2.disconnect();
      client3.disconnect();
    });

    it("unauthorized client cannot add a bot", function (done) {
      client2.once("errorMsg", (msg: string) => {
        assert.equal(msg, "You cannot add more bots to the game");
        done();
      });

      client2.emit("addBot");
    });

    it("authorized client can add a bot", function (done) {
      client1.once("errorMsg", (msg: string) => assert.isNotOk(msg));

      client1.once("playerJoined", function (player: PlayerInfo) {
        assert.isOk(player.isBot);
        done();
      });

      client1.emit("addBot");
    });

    // it("user can take over a bot if room is full", function (done) {
    //   client3.once("roomInfo", function ({ players }: RoomInfo) {
    //     assert.equal(players.length, 3);

    //     const tester3 = players[2];
    //     assert.isNotOk(tester3.isBot);
    //     assert.equal(tester3.name, "tester3");

    //     done();
    //   });

    //   client3.once("errorMsg", function (msg: string) {
    //     assert.isNotOk(msg);
    //     process.exit(0);
    //   });

    //   client3.emit("joinRoom", roomOptions.roomId);
    // });
  });
});
