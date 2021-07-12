//to generate an island follow the these steps:
//1. pick a random i and j value for the center of the island
//2. pick a random value for the width of the island
//3. starting from the j value of the island minus half of the width, set the values of the map to 1
//4. generate the layers above and below the middle line of the island by following step 5
//5. starting at the most left square for each new layer and going to the most right square, change the map value to a 1 if:
//5a. the middle is 1 and the right corner is 1 and random number [0, 1) < probability 
//5b. the left corner is 1 and the middle is 1 and the right corner is 1
//5c. the left corner is 1 and the middle is 1 and random number [0, 1) < probability

let gen_island = function(i, j){
	let width = Math.floor(Math.random()*10 + 1); //get a random island width
	let left_offset = Math.floor(width/2); //how far left to start drawing the base (width) of the island
	for(let k=0; k<width; k++){
		if(in_map(i, j - left_offset + k, map)){ //if the i and j values minus the offset is in the map
			map[i][j - left_offset + k] = 1; //change the value to 1 so it gets drawn as land
		}
	}

	let dir = -1; //the direction that we look to check map values (-1 is down and 1 is up)
	for(let k=0; k<2; k++){ //run this code 2 times (once for the upper half of the island and once for the lower half)
		let start_y = i + dir; //the y value of the starting square for the first layer above or below the base layer
		let start_x = (j < left_offset ? 0 : j - left_offset); //the x value of the starting square for the first layer above or below the base layer (if j is less than the offset then the starting x is set to 0)
		let offset = 0; //this offset is to keep track of which square in each layer we are looking at

		while(possible(start_y, start_x, dir)){ //if the start y and start x for the layer has the possiblility of being part of the island
			if(happens(start_y, start_x + offset, dir)){ //if current square in the layer becomes part of the island
				map[start_y][start_x + offset] = 1; //change the value to 1 so it gets drawn as land
			}

			let next_x = start_x + offset + 1 //the x index for the next square in the layer
			if(possible(start_y, next_x, dir)){ //if that square has the possibility to become part of the island
				offset++; //increase the index by one
				continue; //skip to the next cycle of the while loop
			}

			if(!possible(start_y + dir, start_x, dir)){ //if the leftmost value of the next layer does not have the possibility to become part of the island
				start_x += 1; //the leftmost value + 1 is the start x of the next layer
			}
			start_y += dir; //start y moves up or down for the next layer
			offset = 0; //the offset starts at the beginning of the next layer
		}

		dir *= -1; //change directions and do it all again
	}
}

let possible = function(i, j, dir){
	let values = get_dir_values(i, j, dir); //get the 3 values above or below a given i and j pair
	
	if((values.dir_left && values.dir_mid) || (values.dir_left && values.dir_mid && values.dir_right) || (values.dir_mid && values.dir_right)){ //if the conditions allow for the possibility of setting a square's value to 1
		return true;
	}

	return false;
}

let happens = function(i, j, dir){
	let values = get_dir_values(i, j, dir); //get the 3 values above or below a given i and j pair
	let probability = Math.random() < 0.35; //the probability of a square on either end of a layer to become part of the island

	if((values.dir_left && values.dir_mid && probability) || (values.dir_left && values.dir_mid && values.dir_right) || (values.dir_mid && values.dir_right && probability)){ //if a square gets to change it's value to 1
		return true
	}

	return  false;
}

let get_dir_values = function(i, j, dir){
	if(!in_map(i, j, map)){ //if the i and j pair is not in the map then return false
		return false;
	}

	let dir_left = in_map(i - dir, j - 1, map) ? map[i - dir][j - 1] : false; //check if the top left or bottom left corner is part of the island
	let dir_mid = in_map(i - dir, j, map) ? map[i - dir][j] : false; //check if the top or bottom middle is part of the island
	let dir_right = in_map(i - dir, j + 1, map) ? map[i - dir][j + 1] : false; //check if the top right or bottom right corner is part of the island

	return {
		dir_left: dir_left,
		dir_mid: dir_mid,
		dir_right: dir_right
	};
}