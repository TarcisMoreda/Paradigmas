import { LABELS, SUITS } from "../consts";

export default class Card{
	#value;
	#label;
	#suit;
	
	/**
	 * @constructor
	 * @param {number} value - Valor da carta
	 * @param {String} suit - Naipe da carta
	 */
	constructor(value, suit){
		this.value = value;
		this.suit = suit;
	}

	get value(){
		return this.#value;
	}
	set value(value){
		if(isNaN(value) || value<1 || value>13){
			this.#value = this.#value ?? 1;
			this.#label = this.#label ?? 'A';
			return;
		}

		this.#value = value;
		this.#label = LABELS[value-1];
	}

	get label(){
		return this.#label;
	}

	get suit(){
		return this.#suit;
	}
	set suit(suit){
		if(!SUITS.includes(suit)){
			this.#suit = this.#suit ?? SUITS[0];
			return;
		}

		this.#suit = suit;
	}

	get image(){
		return `card_${this.#suit}_${this.#label}.png`;
	}
}