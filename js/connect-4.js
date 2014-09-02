function createBoard(row, col){
	var board = $("#c4-board");
	for( i = 1; i <= row; i++){
		$("<div>", {id : "row-"+i, class: "board-row"}).appendTo("#c4-board");
		for( j = 1; j <= col; j++){
			$("<div>", { id : "block-"+i+"-"+j, class: "board-block"}).appendTo("#row-"+i);
		}
	}
}

function playBlock(block){
	//get the column of the clicked block for this play;
	var play_col = block.id.split('-')[2];
	
	//If row is not full, then proceed to set Color and book keeping.
	//Check if player has won, after every move. 
	if( rows_left[play_col] > 0){
		
		$("#block-"+rows_left[play_col]+"-"+play_col).addClass("player-"+player);		
		cells_played[rows_left[play_col]+"-"+play_col] = player;
		checkWin(player, rows_left[play_col], play_col);
		
		rows_left[play_col]--;	//keeping track of rows left in a given column

		player = (player % 2) + 1;	//Next turn changes player.
	}
}

function checkWin(winner, row, col){
	var connected, curr_row, curr_col;
	
	//iterate through all 8-axes to see if there are 4 connected of current player.
	for ( dir in directions){
		connected = 1
		curr_row = row*1; curr_col = col*1;	//to treat as integer in the += operation below.
		
		while( connected <= connect){
			curr_row += directions[dir][0];	curr_col += directions[dir][1];
			
			if( cells_played[curr_row+"-"+curr_col] != null//if the cell has been played 
					&& cells_played[curr_row+"-"+curr_col] == winner ){ //and if cell was played by current player
				connected++;
			}
			else
				break;
		}
		if (connected == 4){
			stopGame(winner);
			break;
		}
	}
}

function stopGame(winner){
	alert("Player "+winner+" is the winner");
}

function loadGame(row, col) {
	connect = 4;	//Connect '4' is win-condition
	rows = row;		//no. of rows and columns in game board. designed for 4,5 now.
	cols = col;	
	player = 1;		// player indicator.
	rows_left = new Array(cols);	//tracks the numbers of rows filled in a given column. 
	cells_played = new Array();		//Associative array to keep track of all moves.
	directions = new Array(8);		//8-axes on which connect-4 win condition can be reached.
	
	// initializing arrays.
	directions =  {"N" : [-1,0], "NE": [-1, 1], "E" : [0,1], "SE": [1,1],
			"S": [1,0], "SW": [1, -1], "W": [0,-1], "NW": [-1,-1] }
	
	for( c = 1; c<=cols; c++)
		rows_left[c] = rows;
	
	//creating game board
	createBoard(row, col);
	
	// onReady functions.
	
	$(".board-block").click( function(){
		playBlock(this);
	});
}