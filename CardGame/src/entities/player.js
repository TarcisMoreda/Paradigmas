import Card from "./card";

export default class Player{
	#hand = [];

	insert(card){
		if(typeof card!=="object")
			return;

		this.#hand.push(card);
	}

	draw(index){
		return this.#hand.splice(index, 1);
	}
}