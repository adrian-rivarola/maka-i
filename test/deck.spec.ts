import { TestingDeck } from "./TestClasses.spec";

import { assert } from "chai";
import "mocha";

describe("Deck", function () {
  let deck: TestingDeck;

  it("can create a deck", function () {
    deck = new TestingDeck(["suit1", "suit2", "suit3", "suit4"]);

    assert.isFunction(deck.getCard);
    assert.isFunction(deck.reset);
  });

  it("can deal only 48 cards", function () {
    assert.throws(
      () => deck.getCard(100),
      "Trying to pop from an empty array!"
    );
  });

  it("can reset deck", function () {
    deck.reset();
    assert.doesNotThrow(() => deck.getCard());
  });

  it("can get cards from deck", function () {
    let cards = deck.getCard(5);

    assert.isArray(cards);
    assert.equal(cards.length, 5);
  });
});
