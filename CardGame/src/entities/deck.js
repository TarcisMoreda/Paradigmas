import { SUITS } from "../consts";
import { shuffle_array } from "../utils";
import Card from "./card";

export default class Deck{
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
		if(hands.length===0)
			return;
		hands.forEach(el=>{
			if(el.length===0)
				return;
		});

		let deck = this.#create();

		for(let i=0; i<hands.length; ++i)
			hands[i].forEach(card=>{
				let index = deck.findIndex((el)=>el.label===card.label && el.value===card.value);
				deck.splice(index, 1);
			})	

		this.#cards = deck;
		this.shuffle();
	}

	top(){
		return this.#cards[this.#cards.length-1];
	}

	insert(card){
		if(typeof card!=='object')
			return;

		this.#cards.unshift(card);
	}

	#create(){
		let deck = [];

		for(let suit of SUITS)
			for(let i=0; i<13; ++i)
				deck.push(new Card(i+1, suit));

		return deck;
	}
}