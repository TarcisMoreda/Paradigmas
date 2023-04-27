import { Deck } from "./src/entities/deck";

let hand = []
let deck = new Deck();
deck.shuffle();
for(let i=0; i<3; ++i)
    hand.push(deck.draw());
hand.pop();

deck.reset([hand]);
console.log(deck);