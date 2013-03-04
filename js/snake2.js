function renderSnake2 (){
	$('td').removeClass('snakeCell2 snakeHead2');
	for (var cell in snakeCells2 ){
		$('tr').eq( snakeCells2[cell][0] ).find('td').eq(snakeCells2[cell2][1]).addClass('snakeCell2');
	}
	$('tr').eq( snakeHead2[0] ).find('td').eq(snakeHead2[1]).addClass('snakeHead2');
}
//Prekreslovanie pozície hadíka 2
function updateSnakeCell2(){
	var snakeNewHead2 = [];
	//Zistenie smeru pohybu hadíka
	switch(direction){
		case 'd':
			snakeNewHead2 = [ snakeHead2[0], snakeHead2[1]+1 ];
			break;
		case 'a':
			snakeNewHead2 = [ snakeHead2[0], snakeHead2[1]-1 ];
			break;
		case 'w':
			snakeNewHead2 = [ snakeHead2[0]-1, snakeHead2[1] ];
			break;
			case 's':
				snakeNewHead2 = [ snakeHead2[0]+1, snakeHead2[1] ];
			break;
	}
	var newCell2 = {length:0}
	//Narazil do lavej alebo hornej steny ?
	if( snakeNewHead2[0] < 0 || snakeNewHead2[1] < 0 ) {
		gameOver();
		return;
	} else if( snakeNewHead2[0] >= size || (snakeNewHead2[1] -3) >= size ) {//Narazil do pravej alebo dolnej steny
		gameOver();
		return;
	}
	//Zistovanie dalsej bunky kde pojde hadík
	var newCell2 = $('tr').eq( snakeNewHead2[0] ).find('td').eq(snakeNewHead2[1]);
	
	if( newCell2.length == 0 ) {
		gameOver();
	} else {//Narazil do seba ?
		if ( newCell2.hasClass('snakeCell2') ) {
			gameOver();
		} else {
			if( newCell2.hasClass( 'fruitCell2' ) ) {
				snakeCells2.push( [] );
				getFruitCell();
				renderFruitCell();
				score2 += 100;
				$( '#scoreBoard2' ).html( 'Skóre : ' + score2 );
				speed = speed -5 > 15?speed-5:speed;
				clearInterval( ticker );
				startGame();
			}
			for( var i = ( snakeCells2.length - 1 ); i > 0 ; i-- ) {
				snakeCells2[ i ] = snakeCells2[ i - 1 ];
			}
			snakeCells2[ 0 ] = snakeHead2 = snakeNewHead2;
			renderSnake2();
		}
	}
}
//Zistovanie nového smeru hada èíslo 2 a zmena na tento smer
function getNewDirection2( keyCode ) {
	var codes2 = {
		89 : 'w',
		83 : 's',
		68 : 'd',
		65 : 'a'
	};
		if( typeof codes2[ keyCode ] != 'undefined' ) {
		var newDirection2 = codes2[ keyCode ], changeDirection2 = true;
		switch( direction2 ) {
			case 'w' :
				changeDirection2 = newDirection2 != 's';
				break;
			case 's' :
				changeDirection2 = newDirection2 != 'w';
				break;
			case 'd' :
				changeDirection2 = newDirection2 != 'a';
				break;
			case 'a' :
				changeDirection2 = newDirection2 != 'd';
				break;
		}
		direction2 = changeDirection2 ? newDirection2 : direction2;
	}
}