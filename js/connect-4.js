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
	var play_row = block.id.split('-')[1];
	var play_col = block.id.split('-')[2];
	
	if( rows_played[play_col] > 0){
		
		$("#block-"+rows_played[play_col]+"-"+play_col).addClass("player-"+player);		
		cells_played[rows_played[play_col]+"-"+play_col] = player;
		checkWin(player, play_row, play_col);
		
		rows_played[play_col]--;

		player = (player % 2) + 1;
	}
}

function checkWin(winner, row, col){
	var connected, curr_row, curr_col;
	
	for ( dir in directions){
		connected = 1
		curr_row = row*1; curr_col = col*1;
		
		while( connected <= connect){
			curr_row += directions[dir][0];	curr_col += directions[dir][1];
			
			if( cells_played[curr_row+"-"+curr_col] != null// if the cell has been played 
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
	connect = 4;
	rows = row;
	cols = col;	
	player = 1;
	rows_played = new Array();
	cells_played = new Array();
	directions = new Array();
	
	directions =  {"N" : [-1,0], "NE": [-1, 1], "E" : [0,1], "SE": [1,1],
			"S": [1,0], "SW": [1, -1], "W": [0,-1], "NW": [-1,-1] }
	
	for( c = 1; c<=cols; c++)
		rows_played[c] = rows;
	createBoard(row, col);
	
	$(".board-block").click( function(){
		playBlock(this);
	});
}