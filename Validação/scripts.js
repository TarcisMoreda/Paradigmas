let btnCEP = document.getElementById("btnCEP");
let cep = document.getElementById("cep");
btnCEP.addEventListener('click', validateCEP);

let btnData = document.getElementById("btnData");
let data = document.getElementById("data");
btnData.addEventListener('click', validateDate);

let btnCPF = document.getElementById("btnCPF");
let cpf = document.getElementById("cpf");
btnCPF.addEventListener('click', validateCPF);

let btnEmail = document.getElementById("btnEmail");
let email = document.getElementById("email");
btnEmail.addEventListener('click', validateEmail);

let btnCard = document.getElementById("btnCard");
let car = document.getElementById("card");
btnCard.addEventListener('click', validateCard);

function validateCEP(){
	let cepText = cep.value;
	cepText = cepText.trim();

	if(cepText.split(",").length-1>1){
		alert("CEP inválido...");
		return;
	}
	
	let index = cepText.indexOf('-');
	if (index!=-1 && index!=5){
		alert("CEP inválido...");
		return;
	}

	cepText = cepText.replace('-', '');
	
	if(isNaN(cepText)){
		alert("CEP inválido...");
		return;
	}
	if(cepText.length!=8){
		alert("CEP inválido...");
		return;
	}

	alert("CEP válido!");
	return;
}

function validateDate(){
	let diaMes = [
		31, 28, 31, 30, 31, 30,
		31, 31, 30, 31, 30, 31
	]

	let dateText = data.value;
	dateText = dateText.trim();

	dateText = dateText.split("/").map(x=>parseInt(x));
	if(dateText.length!=3){
		alert("Data inválida!");
		return;
	}

	if(isNaN(dateText[2]) || dateText[2]<0){
		alert("Data inválida! Aceitamos apenas anos depois de cristo...");
		return;
	}
	if(dateText[2]%4==0)
		diaMes[1] += 1;
	if(isNaN(dateText[1]) || dateText[1]<1 || dateText[1]>12){
		alert("Data inválida!");
		return;
	}
	if(isNaN(dateText[0]) || dateText[0]<1 || dateText[0]>diaMes[dateText[1]-1]){
		alert("Data inválida!");
		return;
	}
	
	alert("Data válida!");
}

function validateCPF(){
	let cpfText = cpf.value;
	cpfText = cpfText.trim();
	if(cpfText.indexOf("-")!=9){
		alert("CPF inválido!");
		return;
	}

	cpfText = cpfText.split("-");
	if(cpfText.length!=2){
		alert("CPF inválido!");
		return;
	}
	cpfText[0] = cpfText[0].split("").map(x=>parseInt(x));
	cpfText[1] = parseInt(cpfText[1]);
	if(isNaN(cpfText[1])){
		alert("CPF inválido!");
		return;
	}

	let verificador1 = 0;
	let mult = 2;
	for(let i=8; i>=0; --i){
		if(isNaN(cpfText[0][i])){
			alert("CPF inválido!");
			return;
		}
		verificador1 += cpfText[0][i]*mult++;
	}
	
	verificador1 %= 11;
	verificador1<2 ? verificador1=0 : verificador1=11-verificador1;

	let verificador2 = verificador1*2;
	mult = 3;
	for(let i=8; i>=0; --i)
		verificador2 += cpfText[0][i]*mult++;
	
	verificador2 %= 11;
	verificador2<2 ? verificador2=0 : verificador2=11-verificador2;

	if(cpfText[1]!=((verificador1*10)+verificador2)){
		alert("CPF inválido!");
		return;
	}

	alert("CPF válido!");
}

function validateEmail(){
	let regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
	if(regexEmail.test(email.value.trim()))
		alert("Email válido!");
	else
		alert("Email inválido!");
}

function validateCard(){
	let cardText = card.value;
	cardText = cardText.trim();
	cardText = cardText.replaceAll(" ", "");
	if(cardText.length!=16){
		alert("Cartâo inválido!");
		return;
	}
	
	cardText = cardText.split("").map(x=>parseInt(x));
	
	let sum = 0;
	for(let i=0; i<15; ++i){
		if(i%2==0){
			cardText[i] *= 2;
			if(cardText[i]>9){
				let str = String(cardText[i]);
				cardText[i] = parseInt(str[0])+parseInt(str[1]);
			}
		}

		sum += cardText[i];
	}

	sum %= 10;
	if(sum!=0)
		sum = 10-sum;

	if(sum==cardText[15])
		alert("Cartão válido!");
	else
		alert("Cartão inválido!");
}