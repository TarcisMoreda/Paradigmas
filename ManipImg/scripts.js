const canvas = document.getElementById("img-canvas");
const ctx = canvas.getContext("2d");
let img = document.getElementById("img-simple");

let btn_vertical = document.getElementById("btn-vertical");
let btn_horizontal = document.getElementById("btn-horizontal");
let btn_rot = document.getElementById("btn-rot");
let quant_escala = document.getElementById("quant-escala");
let btn_escala = document.getElementById("btn-escala");

img.onload = ()=>{
	canvas.style.height = `${img.height}px`;
	img.style.height = `${img.height}px`;
	canvas.width = img.width;
	canvas.height = img.height;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

btn_horizontal.addEventListener('click', ()=>{
	let width = canvas.width*4;
	let height = canvas.height;

	let image_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = image_data.data;

	for(let i=0; i<height; i++){
		for(let j=0; j<width/2; j+=4){
			let temp = [
				data[j+(i*width)],
				data[j+(i*width)+1],
				data[j+(i*width)+2],
				data[j+(i*width)+3]
			];

			data[j+(i*width)]   = data[width-4-j+(i*width)];
			data[j+(i*width)+1] = data[width-4-j+(i*width)+1];
			data[j+(i*width)+2] = data[width-4-j+(i*width)+2];
			data[j+(i*width)+3] = data[width-4-j+(i*width)+3];

			data[width-4-j+(i*width)]   = temp[0];
			data[width-4-j+(i*width)+1] = temp[1];
			data[width-4-j+(i*width)+2] = temp[2];
			data[width-4-j+(i*width)+3] = temp[3];
		}
	}

	image_data.data = data;
	ctx.putImageData(image_data, 0, 0);
});

btn_vertical.addEventListener('click', ()=>{
	let width = canvas.width;
	let height = canvas.height;

	let image_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = image_data.data;

	for(let i=0; i<height/2; i++){
		for(let j=0; j<width*4; j+=4){
			let temp = [
				data[j+(i*width*4)],
				data[j+(i*width*4)+1],
				data[j+(i*width*4)+2],
				data[j+(i*width*4)+3]
			];

			data[j+(i*width*4)] = data[j+((height-i-1)*width*4)];
			data[j+(i*width*4)+1] = data[j+((height-i-1)*width*4)+1];
			data[j+(i*width*4)+2] = data[j+((height-i-1)*width*4)+2];
			data[j+(i*width*4)+3] = data[j+((height-i-1)*width*4)+3];

			data[j+((height-i-1)*width*4)] = temp[0];
			data[j+((height-i-1)*width*4)+1] = temp[1];
			data[j+((height-i-1)*width*4)+2] = temp[2];
			data[j+((height-i-1)*width*4)+3] = temp[3];
	}
	}

	image_data.data = data;
	ctx.putImageData(image_data, 0, 0);
});

btn_rot.addEventListener('click', () => {
	let width = canvas.width;
	let height = canvas.height;

	let image_data = ctx.getImageData(0, 0, width, height);
	let data = image_data.data;
	let rotated_data = new Uint8ClampedArray(data.length);
	
	for(let i=0; i<width; i++){
		for(let j=0; j<height; j++){
			let index = (j*width+i)*4;
			let new_index = ((width-i-1)*height+j)*4;

			rotated_data[new_index] = data[index];
			rotated_data[new_index+1] = data[index+1];
			rotated_data[new_index+2] = data[index+2];
			rotated_data[new_index+3] = data[index+3];
		}
	}

	canvas.width = height;
	canvas.height = width;
	canvas.style.width = `${height}px`;
	canvas.style.height = `${width}px`;
	let rotated_image = new ImageData(rotated_data, canvas.width, canvas.height);
	ctx.putImageData(rotated_image, 0, 0);
});

btn_escala.addEventListener('click', ()=>{
	let width = canvas.width;
	let height = canvas.height;

	let image_data = ctx.getImageData(0, 0, width, height);
    let data = image_data.data;
    let scaled_image_data = ctx.createImageData(width, height);
    let scaled_data = scaled_image_data.data;
    let source_width = image_data.width;
    
    for (let x=0; x<width/2; ++x) {
        for (let y=0; y<height; ++y) {
            let newX = x*2;
            let newY = y*2;

            let index = ((newY*source_width)+newX)*4;
            let new_index = ((y*width)+x)*4;

            scaled_data[new_index] = data[index];
            scaled_data[new_index+1] = data[index+1];
            scaled_data[new_index+2] = data[index+2];
            scaled_data[new_index+3] = data[index+3];
        }
    }

	scaled_image_data.data = scaled_data
        
	canvas.width = width/2;
	canvas.height = height/2;
	canvas.style.width = `${canvas.width}px`;
	canvas.style.height = `${canvas.height}px`;
	ctx.putImageData(scaled_image_data, 0, 0);
});