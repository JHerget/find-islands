//to calculate the number of islands in a given map:
//1. starting in the most left column of the map check the value at each index of the column and mark it as visited
//2. if the value at the index of a column is 1:
//2a. mark it as visited
//2b. increase the number of islands found by 1
//2c. follow the border of the island all the way around and mark each index as visited
//3. if the index of a column has already been visited then stop doing step 2 until a value of 0 is found in the column

let visited = []; //keep track of which squares in the map have been checked
let islands_found = 0; //keep track of how many islands have been found

let find_islands = function(map){
	let col = map.length; //number of squares in each column
	let row = map[0].length; //number of squares in each row

	for(let i=0; i<col; i++){ //for each square in the column
		for(let j=0; j<row; j++){ //for each square in the row
			if(!visited[i*row + j]){ //if the square has not been visited
				visited[i*row + j] = true; //make the square as visited
				
				if(map[i][j]){ //if the value of the square is not 0
					islands_found++; //increase the number of islands found by 1
					map[i][j] = 2; //set the value of the square to 2 to mark where the island was discovered
					mark_island(i, j, row, map); //mark the rest of the island as visited so it doesn't get counted more than once
				}
			}
		}
	}
}

let mark_island = function(i, j, row, map){
	if(map[i][j]){ //if the value fo the square is not 0
		let data = index_data(i, j, map).surrounding; //get the values of the squares around the given square

		for(let k=0; k<data.length; k++){ //for each value in the data array
			if(data[k] && !visited[data[k][0]*row + data[k][1]]){ //if the value of data at the index is not false and the square at the i and j pair has not been visited
				visited[data[k][0]*ROW + data[k][1]] = true; //mark it as visited
				mark_island(data[k][0], data[k][1], row, map); //recurse using the new i and j pair
			}
		}
	}
}

let index_data = function(i, j, map){
	let surrounding = [[i - 1, j], [i - 1, j - 1], [i, j - 1], [i + 1, j - 1], [i + 1, j], [i + 1, j + 1], [i, j + 1], [i - 1, j + 1]]; //the i and j pairs for the 8 squares surrounding the given square startring from the square directly above it and going counter clockwise around it
	let is_border = false; //if the given square is an island border

	for(let k=0; k<surrounding.length; k++){ //for each value of the surrounding squares
		let temp_i = surrounding[k][0];
		let temp_j = surrounding[k][1];

		if(!in_map(temp_i, temp_j, map)){ //if the i and j pair is not in the map
			surrounding[k] = false; //change the value of the i and j pair to false
		}else if(map[i][j] && !map[temp_i][temp_j]){ //else if the value at the given square is not 0 and the value of the surrounding square is 0
			is_border = true; //the given square is an island border
		}
	}

	return {
		surrounding: surrounding,
		is_border: is_border
	};
}

let in_map = function(i, j, map){
	let col = map.length; //the number of squares in the column
	let row = map[0].length; //the number of squares in the row

	if(i >= 0 && i < col && j >= 0 && j < row){ //if the i and j pair is within the bounds of the given map
		return true;
	}

	return false;
}