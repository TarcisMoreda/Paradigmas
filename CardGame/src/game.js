import Player from "./entities/player";
import Deck from "./entities/deck";
import Stack from "./entities/stack";
import { DOMAIN, IMG_PATH } from "./consts";
import { card_from_image } from "./utils";

export default class Game{
	#back;
	#top;
	#stacks = [
		[], [], [], [], [], [], []
	];
	#aces;
	#prev_select;

	#player;
	#stack = [];
	#deck;

	#selected = ['', null];

	constructor(){
		this.#player = new Player();
		this.#deck = new Deck();
		this.#deck.shuffle();

		this.#load_html_elements();
		this.#prev_select = this.#back;

		this.#create_stacks();
		this.#render_stacks();
	}

	#load_html_elements(){
		this.#back = document.getElementById('back');
		this.#top = document.getElementById('top');
		this.#aces = Array.from(document.getElementsByClassName('ace'));

		this.#back.addEventListener('click', ()=>{
			if(this.#top.src===`${DOMAIN}${IMG_PATH}card_empty.png`)
				this.#top.src = `${IMG_PATH}${this.#deck.top().image}`
		});
		this.#top.addEventListener('click', ()=>{
			if(this.#top.src!==`${DOMAIN}${IMG_PATH}card_empty.png`){
				this.#selected[0] = 'top';
				this.#selected[1] = this.#deck.top();
				this.#render();
			}
		});
		this.#aces.forEach((ace)=>{
			ace.addEventListener('click', ()=>{
				let image = ace.src.split(DOMAIN)[1];
				let card = card_from_image(image);

				if(this.#selected[0]==='stack'){
					let stack_card = this.#stack[this.#selected[1][0]].get_card(this.#selected[1][1]);

					if(this.#stack[this.#selected[1][0]].length-1!==this.#selected[1][1])
						return;
					if(card.suit===stack_card.suit && card.value===stack_card.value){
						ace.src = `${IMG_PATH}${stack_card.image}`;
						this.#stack[this.#selected[1][0]].pop();

						ace.style.opacity = '100%';
					}
				}
				else if(this.#selected[0]==='top'){
					if(card.suit===this.#selected[1].suit && card.value===this.#selected[1].value){
						ace.src = `${IMG_PATH}${this.#selected[1].image}`
						this.#top.src = 'cards/card_empty.png';
						this.#deck.draw();	
					
						ace.style.opacity = '100%';
					}
				}

				this.#selected[0] = '';
				this.#selected[1] = null;
				this.#render();
			});
		});
	}

	#create_stacks(){
		let imgs = document.getElementsByClassName('stack-card')
		
		for(let i=0; i<7; ++i){
			this.#stack.push(new Stack());
			for(let j=0; j<i+1; ++j)
				this.#stack[i].insert(this.#deck.draw());
		}

		for(let i=0; i<7; ++i)
			for(let j=0; j<13; ++j){
				this.#stacks[i].push(imgs[(i*13)+j]);
				this.#stacks[i][j].addEventListener('click', ()=>{
					let card = this.#stack[i].get_card(j);
					console.log(card.visible);
					if(this.#selected[1]!==null)
						console.log(`
							${card.visible}\n
							${j===this.#stack[i].length-1}\n
							${this.#selected[0]==='stack'}\n
							${this.#selected[1][0]!==i}\n
							${this.#selected[1][1]<=this.#stack[this.#selected[1][0]].length-1}
						`);

					if(card.visible && j===this.#stack[i].length-1 && this.#selected[0]==='top' && card.color!==this.#selected[1].color && card.value===this.#selected[1].value+1){						
						this.#selected[1].visible = true;
						this.#stack[i].insert(this.#selected[1]);

						this.#top.src = 'cards/card_empty.png';
						this.#deck.draw();

						this.#selected[0] = '';
						this.#selected[1] = null;
					}
					else if(card.visible && j===this.#stack[i].length-1 && this.#selected[0]==='stack' && this.#selected[1][0]!==i && this.#selected[1][1]<=this.#stack[i].length-1){
						if(this.#stack[this.#selected[1][0]].get(this.#selected[1][1]).color===card.color)
							return;
						
						let cards = this.#stack[this.#selected[1][0]].get_cards(this.#selected[1][1]);			
						this.#stack[i].add_cards(cards);

						this.#selected[0] = '';
						this.#selected[1] = null;
					}
					else if(card.visible){
						this.#selected[0] = 'stack';
						this.#selected[1] = [i, j];
					}

					this.#render();
				});
			}
	}

	#render(){
		this.#render_stacks();
		this.#render_highlight();
	}
	#render_stacks(){
		for(let i=0; i<7; ++i)
			for(let j=0; j<13; ++j){
				if(j<this.#stack[i].visible){
					let card = this.#stack[i].get_card(j);
					if(card.visible)
						this.#stacks[i][j].src = `${IMG_PATH}${card.image}`;
					else
						this.#stacks[i][j].src = `${IMG_PATH}card_back.png`;
				}
				else
					this.#stacks[i][j].src = '';
			}
		this.#render_highlight();
	}
	#render_highlight(){
		this.#prev_select.style.border = 'none';
		
		if(this.#selected[0]==='top')
			this.#prev_select = this.#top;
		else if(this.#selected[0]==='stack')
			this.#prev_select = this.#stacks[this.#selected[1][0]][this.#selected[1][1]];

		
		if(this.#selected[0]!=='')
			this.#prev_select.style.border = '1px solid red';
	}
} 