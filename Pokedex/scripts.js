// let poke = fetch("https://pokemon.danielpimentel.com.br/v1/pokemon/geracao/1/50/1")
			// .then((res)=>res.json())
			// .then((res)=>showPokemons(res.pokemon))
			// .catch((err_)=>console.log(err_));

// function showPokemons(arr){
// 	let pokedex = document.getElementById("pokedex");
// 	let html = "";

// 	for(let i=0; i<arr.length; ++i){
// 		const nome = arr[i].nome.charAt(0).toUpperCase() + arr[i].nome.slice(1);
// 		nome[0] = nome[0].toUpperCase();
// 		html += `
// 			<div id="wrapper">
// 				<img src="${arr[i].img_3d}" height=150 />
// 				<div>${nome}</div>
// 			</div>
// 		`;

// 		pokedex.innerHTML = html;
// 	}
// }

let btn = document.getElementById("search");
let pokeName = document.getElementById("name");
let pokeGen = document.getElementById("gen");
let result = document.getElementById("result");

btn.addEventListener('click', checkValidity);

function checkValidity(){
	let gen = pokeGen.value;

	searchPokemon()
	.then((pokemon)=>{
		if(pokemon==undefined){
			alert("O nome do pokemon está errado...");
			return;
		}

		if(pokemon.geracao==gen){
			pokemon.nome = pokemon.nome.charAt(0).toUpperCase()+pokemon.nome.slice(1);

			let html = `
				<div class="image-wrapper"><img class="poke-image" src="${pokemon.img}"\\></div>
				<div class="info">
					<div class="poke-number">Número: ${pokemon.numero}</div>
					<div class="poke-name">Nome: ${pokemon.nome}</div>
					<div class="poke-type">Tipo: ${pokemon.tipo}</div>
					<div class="poke-gen">Geração: ${pokemon.geracao}</div>
				</div>
			`

			result.innerHTML = html;
		}
		else
			alert("A geração não bate com o nome...");
	})
	.catch((err_)=>alert(err_));
}

function searchPokemon(){
	let name = pokeName.value.toLowerCase();

	return new Promise((res, rej)=>{
		fetch(`https://pokemon.danielpimentel.com.br/v1/pokemon/nome/${name}`)
				.then((poke)=>poke.json())
				.then((pokemon)=>res(pokemon.pokemon))
				.catch(()=>rej("Erro de comunicação com a API."));
	});
}