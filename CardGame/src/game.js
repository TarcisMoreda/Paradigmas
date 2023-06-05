import Player from "./entities/player";
import Deck from "./entities/deck";
import Stack from "./entities/stack";
import { DOMAIN, IMG_PATH } from "./consts";
import { card_from_image } from "./utils";

export default class Game{
	#back;
	#tops;
	#stacks = [
		[], [], [], [], [], [], []
	];
	#aces;
	#prev_select;
	#stack = [];
	#top = [];

	#deck;

	#selected = ['', null];

	constructor(){
		this.#deck = new Deck();
		this.#deck.shuffle();

		this.#load_html_elements();
		this.#prev_select = this.#back;

		this.#create_stacks();
		this.#update();
	}

	#load_html_elements(){
		this.#back = document.getElementById('back');
		this.#tops = document.getElementById('top');
		this.#aces = Array.from(document.getElementsByClassName('ace'));

		this.#back.addEventListener('click', ()=>{
			this.#top.push(this.#deck.draw());
			this.#update();
		});
		this.#tops.addEventListener('click', ()=>{
			if(this.#selected[0]==='top'){
				this.#selected[0] = '';
				this.#selected[1] = null;
				this.#update();
			}
			else if(this.#top.length!==0){
				this.#selected[0] = 'top';
				this.#selected[1] = this.#top[this.#top.length-1];
				this.#update();
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
					if(card.suit===stack_card.suit && (card.value===stack_card.value || card.value+1===stack_card.value)){
						ace.src = `${IMG_PATH}${stack_card.image}`;
						this.#stack[this.#selected[1][0]].pop();

						ace.style.opacity = '100%';
					}
				}
				else if(this.#selected[0]==='top'){
					if(card.suit===this.#selected[1].suit && (card.value===this.#selected[1].value || card.value+1===this.#selected[1].value)){
						ace.src = `${IMG_PATH}${this.#selected[1].image}`
						this.#tops.src = `${IMG_PATH}${this.#top.pop().image}`;
					
						ace.style.opacity = '100%';
					}
				}

				this.#selected[0] = '';
				this.#selected[1] = null;
				this.#update();
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
					if(this.#stacks[i][0].src===`${DOMAIN}cards/card_empty.png`){
						if(this.#selected[0]==='top'){
							this.#selected[1].visible = true;
							this.#stack[i].insert(this.#selected[1]);

							this.#tops.src = `${IMG_PATH}${this.#top.pop().image}`;

							this.#selected[0] = '';
							this.#selected[1] = null;
						}
						else if(this.#selected[0]==='stack'){
							let cards = this.#stack[this.#selected[1][0]].get_cards(this.#selected[1][1]);			
							this.#stack[i].add_cards(cards);
	
							this.#selected[0] = '';
							this.#selected[1] = null;
						}
						
						this.#update();
						return;
					}

					let card = this.#stack[i].get_card(j);
					if(this.#selected[0]==='' && card.visible){
						this.#selected[0] = 'stack';
						this.#selected[1] = [i, j];
						this.#update();

						return;
					}

					if(this.#selected[0]==='stack')
						if(i===this.#selected[1][0]){
							this.#selected[0] = '';
							this.#selected[1] = null;
							this.#update();

							return;
						}

					
					if(card.visible && j===this.#stack[i].length-1 && this.#selected[0]==='top' && card.color!==this.#selected[1].color && card.value===this.#selected[1].value+1){						
						this.#selected[1].visible = true;
						this.#stack[i].insert(this.#selected[1]);

						this.#tops.src = `${IMG_PATH}${this.#top.pop().image}`;

						this.#selected[0] = '';
						this.#selected[1] = null;
					}
					else if(card.visible && j===this.#stack[i].length-1 && this.#selected[0]==='stack' && this.#selected[1][0]!==i){
						if(this.#stack[this.#selected[1][0]].get(this.#selected[1][1]).color!==card.color && this.#stack[this.#selected[1][0]].get(this.#selected[1][1]).value+1===card.value){
							if(this.#stack[this.#selected[1][0]].length>1){
								let cards = this.#stack[this.#selected[1][0]].get_cards(this.#selected[1][1]);			
								this.#stack[i].add_cards(cards);
							}
							else{
								let card = this.#stack[this.#selected[1][0]].get_card(0);
								this.#stack[this.#selected[1][0]].pop();			
								this.#stack[i].insert(card);
							}
	
							this.#selected[0] = '';
							this.#selected[1] = null;
						}
					}

					this.#update();
				});
			}
	}

	#update(){
		this.#render_stacks();
		this.#render_top();
		this.#render_highlight();
		this.#check_win();
	}
	#render_stacks(){
		for(let i=0; i<7; ++i){
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
			if(this.#stack[i].length===0)
				this.#stacks[i][0].src = `${IMG_PATH}card_empty.png`;
		}
	}
	#render_top(){
		if(this.#top.length===0){
			this.#tops.src = `${IMG_PATH}card_empty.png`;
			return;
		}
		this.#tops.src = `${IMG_PATH}${this.#top[this.#top.length-1].image}`;
	}
	#render_highlight(){
		this.#prev_select.style.backgroundColor = '';
		
		if(this.#selected[0]==='top')
			this.#prev_select = this.#tops;
		else if(this.#selected[0]==='stack')
			this.#prev_select = this.#stacks[this.#selected[1][0]][this.#selected[1][1]];

		
		if(this.#selected[0]!=='')
			this.#prev_select.style.backgroundColor = 'white';
	}
	#check_win(){
		let quant = 0;
		for(let i=0; i<this.#stack.length; ++i)
			if(this.#stack[i].length===0)
				++quant;

		if(quant===7)
			alert('Você ganhou!\n(f5 para jogar novamente)');
	}
}