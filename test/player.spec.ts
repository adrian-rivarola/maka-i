import { Tester, TestingDeck } from "./TestClasses.spec";

import { assert } from "chai";
import "mocha";

const deck = new TestingDeck();

describe("Player", function () {
  let player: Tester;

  it("can create a player", function () {
    player = new Tester("tester1");

    assert.equal(player.name, "tester1");
    assert.equal(player.gamesWon, 0);

    assert.isFunction(player.addCard);
    assert.isFunction(player.resetHand);
    assert.isFunction(player.restart);
  });

  it("can deal cards to player", function () {
    assert.equal(player.cards.length, 0);

    let cards = deck.getCard(3);
    player.addCard(cards);

    assert.equal(player.cards.length, 3);
  });

  it("can reset player", function () {
    player.resetHand();
    assert.equal(player.cards.length, 0);
    assert.equal(player.isReady, false);
  });
});
