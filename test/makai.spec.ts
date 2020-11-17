import { MakaiGame, MakaiPlayer } from "../src/lib/makai";

import { assert } from "chai";
import "mocha";

function createCard(number: number, suit: number): Card {
  return {
    number,
    suit: suit.toString(),
    toString: "",
  };
}

describe("Makai", function () {
  describe("player", function () {
    let player = new MakaiPlayer("tester1"),
      cards: Card[];

    describe("calculate score", function () {
      beforeEach("reset player", function () {
        player.resetHand();
        cards = [];
      });

      it("< 10", function () {
        cards = [createCard(1, 0), createCard(2, 0)];
        player.addCard(cards);
        assert.equal(player.score, 3);

        player.addCard(createCard(2, 0));
        assert.equal(player.score, 5);
      });

      it("> 10", function () {
        cards = [createCard(6, 0), createCard(5, 0)];
        player.addCard(cards);
        assert.equal(player.score, 1);

        player.addCard(createCard(7, 0));
        assert.equal(player.score, 8);
      });

      it("0", function () {
        cards = [createCard(7, 0), createCard(3, 0)];
        player.addCard(cards);
        assert.equal(player.score, 0);

        player.addCard(createCard(12, 0));
        assert.equal(player.score, 0);
      });

      it("8.5", function () {
        cards = [createCard(12, 0), createCard(11, 0)];
        player.addCard(cards);
        assert.equal(player.score, 0);

        player.addCard(createCard(10, 0));
        assert.equal(player.score, 8.5);
      });
    });
  });

  describe("game", function () {
    let game: MakaiGame;

    before("create Game", function () {
      game = new MakaiGame({
        maxPlayers: 4,
        allowBots: true,
      });

      game.addPlayer("tester1")
      game.addPlayer("tester2")
      game.addPlayer("tester3")
      game.addPlayer("tester4")

      assert.isOk(game.isFull)
    });

    it("start round", function () {
      game.startRound();

      game.players.forEach((player) => assert.equal(player.cards.length, 2));
    });

    it("update players", function () {
      game.players.forEach((player) => {
        player.wantsCard = player.score < 5;

        assert.isOk(player.hasPlayed);
      });

      assert.isOk(game.isRoundOver)
    });

    it("deal third card when round ends", function () {
      game.roundEnded();

      let cardsExpected: number;
      game.players.forEach((player) => {
        cardsExpected = player.wantsCard ? 3 : 2;
        assert.equal(player.cards.length, cardsExpected);
      });
    });

    describe("define winner", function () {
      let cards: Card[], winner: Player;

      beforeEach("reset game", function () {
        game.reset();
        cards = [];
      });

      it("clear winner", function () {
        cards = [createCard(1, 0), createCard(1, 1)];

        game.players.forEach((player) => {
          player.addCard(cards);
          assert.equal(player.score, 2);
        });
        game.players[0].addCard(createCard(7, 0));

        winner = game.getWinner();
        assert.equal(winner.name, game.players[0].name);
      });

      it("same score, eldest player wins", function () {
        cards = [createCard(4, 0), createCard(4, 1)];
        game.players.forEach((player) => {
          player.addCard(cards);
        });

        winner = game.getWinner();
        assert.equal(winner.name, "tester1");
      });

      it("same score, one player has less cards", function () {
        cards = [createCard(4, 0), createCard(4, 1)];
        game.players.forEach((player) => {
          player.addCard(cards);
          player.name !== "tester4" && player.addCard(createCard(12, 0));

          assert.equal(player.score, 8);
        });

        winner = game.getWinner();
        assert.equal(winner.name, "tester4");
      });
    });
  });
});
