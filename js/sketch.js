let COL, ROW, TILE = 10; //COL is the number of squares in each column, ROW is the number of squares in each row, and TILE is the length of each side of each square 
let map = []; //initiating the array that will be the 2 dimensional array for the map

function setup(){
	createCanvas(600, 500);
	COL = height / TILE; //number of squares per column
	ROW = width / TILE; //number of squares per row

	for(let i=0; i<COL; i++){ //for each square in the column
		map[i] = []; //create a new empty array
		for(let j=0; j<ROW; j++){ //for each square in the row
			map[i][j] = 0; //set the value to 0
		}
	}

	for(let i=0; i<floor(random(5, 11)); i++){ //seed the map with a random number of islands
		gen_island(floor(random(0, COL - 1)), floor(random(0, ROW - 1))); //generate an island at a random col and row in the map
	}

	let button = document.createElement("button"); //create a button element
	let br = document.createElement("br"); //create a line break element
	button.innerText = "Find Islands"; //set the button text
	button.onclick = function(){ //set the button click function
		find_islands(map); //find the islands in the given map
		alert("The number of islands found was: " + islands_found); //alert the number of island found
	}
	document.querySelector("body").appendChild(br); //append the button into the document's body
	document.querySelector("body").appendChild(button); //append the line break into the document's body
}

function draw(){
	background(50);

	for(let i=0; i<COL; i++){ //for each square in the column
		for(let j=0; j<ROW; j++){ //for each square in the row
			if(!map[i][j]){ //if the value is 0 then draw it blue to resemble water
				fill(28, 101, 160);
			}else if(map[i][j]){ //if the value is not 0 then draw it green to resemble land
				fill(27, 152, 58);
			}
			if(map[i][j] && index_data(i, j, map).is_border){ //if the value is not 0 and it's a border then draw it yellow to resemble sand
				fill(181, 177, 74);
			}

			if(map[i][j] && visited[i*ROW + j]){ //if the value is not 0 and it's been visited then draw it pink
				fill(194, 0, 126);
			}
			if(map[i][j] == 2){ //if the value is 2 then draw it grey to show that the island has been counted
				fill(50);
			}

			noStroke();
			rect(j*TILE, i*TILE, TILE, TILE);
		}
	}
}