const canvas = document.getElementById("img-canvas");
const ctx = canvas.getContext("2d");
let img = document.getElementById("img-simple");
let gs_const = document.getElementById("const-range");
let color_const = document.getElementById("const-color");
let new_color = document.getElementById("new-color");

gs_const.max = "1000"

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

function chromaKey(){
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	let image_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = image_data.data;
	let tolerance = gs_const.value*1.5;
	let rep = hexToRgb(new_color.value);
	let color = hexToRgb(color_const.value);
	color = [color.r, color.g, color.b];
	color = new Color("sRGB", color);

	for(let i=0; i<data.length; i+=4){
		let curr_color = new Color("sRGB", [data[i], data[i+1], data[i+2]]);
		let dist = color.deltaE(curr_color);
		if(dist>tolerance)
			continue;
		
		data[i] = rep.r;
		data[i+1] = rep.g;
		data[i+2] = rep.b;
	}

	image_data.data = data;
	ctx.putImageData(image_data, 0, 0);
}

img.onload = ()=>{
	canvas.style.height = `${img.height}px`;
	canvas.width = img.width;
	canvas.height = img.height;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

gs_const.onchange = ()=>{
	chromaKey();
}