export default class Stack{
	#cards = [];
	#visible = 0;

	insert(card){
		if(typeof card!=='object')
			return;

		this.#cards.push(card);
		this.#visible++; 
	}

	add_cards(cards){
		if(cards.length===0)
			return;

		this.#cards = [].concat(this.#cards, cards);
		this.#visible += cards.length;
	}

	pop(){
		this.#visible--;
		return this.#cards.pop();
	}

	get(index){
		return this.#cards[index];
	}
	get_card(index){
		this.#cards[this.#cards.length-1].visible = true;
		return this.#cards[index];
	}
	get_cards(index){
		if(index-1<0)
			return [];

		for(let i=0; i<this.#cards.length-index; ++i)
			this.#visible--;
		
		this.#cards[index-1].visible = true;
		console.log(index, this.#cards.length-index);
		return this.#cards.splice(index, this.#cards.length-index);
	}

	get length(){
		return this.#cards.length
	}

	get visible(){
		return this.#visible;
	}
}