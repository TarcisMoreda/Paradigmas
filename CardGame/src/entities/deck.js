import { SUITS } from "../consts";
import { shuffle_array } from "../utils";
import Card from "./card";

export class Deck{
	#cards = [];

	/**
	 * @constructor Cria um baralho de 52 cartas.
	 */
	constructor(){
		this.#cards = this.#create();
	}
	
	shuffle(){
		shuffle_array(this.#cards);
	}

	draw(){
		return this.#cards.pop();
	}

	/**
	 * @desc Remonta o baralho levando em consideração as mãos dos jogadores
	 * 
	 * @param {Array<Array<Card>>} hands - Mão dos jogadores
	 * @return {null} 
	 */
	reset(hands){
		let deck = this.#create();

		for(let i=0; i<hands.length; ++i)
			for(let card of hands[i]){
				let index = deck.findIndex((el)=>el.label===card.label && el.value===card.value);
				deck.splice(index, 1);
			}

		this.#cards = deck;
		this.shuffle();
	}

	#create(){
		let deck = [];

		for(let suit of SUITS)
			for(let i=0; i<13; ++i)
				deck.push(new Card(i, suit));

		return deck;
	}
};