import { Tester, TestingGame } from "./TestClasses.spec";

import { assert } from "chai";
import "mocha";

describe("Game", function () {
  let game: TestingGame;

  it("can create a game", function () {
    game = new TestingGame({
      maxPlayers: 4,
    });

    assert.equal(game.info.roundsPlayed, 0);
    assert.equal(game.info.maxPlayers, 4);

    assert.isArray(game.players);

    assert.isOk(game.isEmpty);

    assert.isNotOk(game.hasStarted);
    assert.isNotOk(game.canStart);
  });

  it("can add players", function () {
    assert.equal(game.players.length, 0);

    game.addPlayer("tester1");
    game.addPlayer("tester2");
    game.addBot();

    assert.equal(game.players.length, 3);
  });

  it("can remove players", function () {
    let tester4 = game.addPlayer("tester4");

    let playerRemoved = game.removePlayer(tester4.name);
    if (!playerRemoved) throw 'Player "tester4" should exist';

    assert.deepEqual(tester4, playerRemoved);
  });

  it("game can start when is full and all players are ready", function () {
    assert.isNotOk(game.isFull);
    assert.isNotOk(game.canStart);
    assert.isNotOk(game.allPlayersReady);

    game.addPlayer("tester4");
    assert.isOk(game.isFull);

    game.players.forEach((player) => (player.isReady = true));

    assert.isOk(game.isFull);
    assert.isOk(game.canStart);
    assert.isOk(game.allPlayersReady);
  });

  it("deal cards when round starts", function () {
    game.players.forEach((player) => assert.equal(player.cards.length, 0));

    game.startRound();

    assert.equal(game.info.roundsPlayed, 1);

    assert.isOk(game.hasStarted);

    game.players.forEach((player) =>
      assert.equal(player.cards.length, game.cardsToDeal)
    );
  });

  it("can reset round", function () {
    game.reset();

    game.players.forEach((player) => assert.equal(player.cards.length, 0));
  });
});
