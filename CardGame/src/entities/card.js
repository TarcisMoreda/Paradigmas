import { SUITS } from "../consts";

const LABELS = [
	'A',
	'02',
	'03',
	'04',
	'05',
	'06',
	'07',
	'08',
	'09',
	'10',
	'J',
	'Q',
	'K'
];

export default class Card{
	#value;
	#label;
	#suit;
	#visible;

	/**
	 * @constructor
	 * @param {number} value - Valor da carta
	 * @param {String} suit - Naipe da carta
	 */
	constructor(value, suit){
		this.value = value;
		this.suit = suit;
		this.#visible = false;
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

	get visible(){
		return this.#visible;
	}
	set visible(visible){
		if(typeof visible!=='boolean')
			return;
		
		this.#visible = visible;
	}

	get image(){
		return `card_${this.#suit}_${this.#label}.png`;
	}
	get color(){
		if(this.#suit===SUITS[1] || this.#suit===SUITS[2])
			return 'red';
		return 'black';
	}
}