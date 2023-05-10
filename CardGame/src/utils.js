import Card from "./entities/card";

export const shuffle_array = array=>{
	for(let i=array.length-1; i>0; --i){
		const j = Math.floor(Math.random()*(i+1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

export const card_from_image = image=>{
	if(image.includes('/'))
		image = image.split('/')[1];
	image = image.split('_');
	image[2] = image[2].split('.')[0];
	return new Card(Number(image[2]), image[1]);
};