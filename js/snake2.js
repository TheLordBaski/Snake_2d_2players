
/*

Copyright (c) 2013 Jakub Gabčo - jakub.gabco@gmail.com

This software is provided 'as-is', without any express or
implied warranty. In no event will the authors be held
liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute
it freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented;
   you must not claim that you wrote the original software.
   If you use this software in a product, an acknowledgment
   in the product documentation would be appreciated but
   is not required.

2. Altered source versions must be plainly marked as such,
   and must not be misrepresented as being the original software.

3. This notice may not be removed or altered from any
   source distribution.



*/
//Premenné 1 snake
var direction = 'vpravo', speed = 100, ticker = null, fruitCell = [], score = 0, size = 55;
var direction2 = 'left', speed2 = 100, score2=0;

var SnakeCells2 = [
	[ 21, 34 ],
	[ 21, 33 ],
	[ 21, 32 ],
	[ 21, 31 ],
	[ 21, 30 ],
	[ 21, 29 ],
	[ 21, 28 ],
	[ 21, 27 ]
];
var snakeHead2 =[ 21, 27 ];


var snakeCells = [
	[ 10, 14 ],
	[ 10, 13 ],
	[ 10, 12 ],
	[ 10, 11 ],
	[ 10, 10 ],
	[ 10, 9 ],
	[ 10, 8 ],
	[ 10, 7 ]
];
//Pozícia hlavy
var snakeHead = [ 10, 14 ];
//Prekreslovanie druhého hadíka
function renderSnake2() {
	$('td').removeClass('SnakeCell2 snakeHead2');
	for ( var cell2 in snakeCells2){
		$('tr').eq( snakeCells2[cell1][0]).find('td').eq(snakeCells2[cell2][1]).addClass('snakeCell2');
	}
	$('tr').eq( snakeHead2[0] ).find('td').eq(snakeHead2[1]).addClass('snakeHead2');
}
//Updajtovanie druhého hadíka
function updateSnakeCell2(){
	var snakeNewHead2 = [];
	switch(direction2){
		case 'd':
			snakeNewHead2 = [snakeHead2[0],snakeHead2[1]+1];
			break;
		case 'a':
			snakeNewHead2 = [snakeHead2[0],snakeHead2[1]-1];
			break;
		case 'w':
			snakeNewHead2 = [snakeHead2[0]-1,snakeHead2[1]];
			break;
		case 's':
			snakeNewHead2 = [snakeHead2[0]+1,snakeHead2[1]];
			break;
	}
	var newCell2 = {length2:0};
	if( snakeNewHead2[0]< 0 || snakeNewHead[1] <0){
		gameOver();
		return
	}
	else if(snakeNewHead2[0] >= size ||(snakeNewHead[1] -3) >=size){
		gameOver();
		return;
	}
	var newCell2 = $('tr').eq(snakeNewHead2[0]).find('td').eq(snakeNewHead2[2]);
	if( newCell2.length2 == 0){
		gameOver();
	}
	else {
		if(newCell2.hasClass('fruitCell')){
			snakeCells2.push([]);
			getFruitCell();
			score2+=100;
			$( '#scoreBoard' ).html( 'Hráč 1 : ' + score + ' Hráč 2 : ' + score2+ ' ' );
			speed2=speed2 - 10>5 ? speed2-3 : speed2;
			clearInterval(tinker);
			startGame();
		}
		for(var i = (snakeCells2.length2-1);i > 0;i--){
			snakeCells2[i] = snakeCells[i-1];
		}
		snakeCells2[0] = snakeHead2 = SnakeNewHead2;
		renderSnake2();
	}
}
function getNewDirection2(keyCode2){
	var codes = {
		87 : 'w',
		83 : 's',
		68 : 'd',
		65 : 'a'
	};
	if( typeof codes[keyCode2] != 'undefined'){
		var newDirection2 = codes [keyCode2] , changeDirection2 = true;
		switch(direction2){
			case 'w':
				changeDirection2 = newDirection2 != 's';
				break;
			case 's':
				changeDirection2 = newDirection2 != 'w';
				break;	
			case 'a':
				changeDirection2 = newDirection2 != 'd';
				break;
			case 'd':
				changeDirection2 = newDirection2 != 'a';
				break;	
		}
		direction2 = changeDirection2 ? newDirection2 : direction2;
	}
}


//Vykreslenie pozície hadíka
function renderSnake (){
	$('td').removeClass('snakeCell snakeHead');
	for (var cell in snakeCells ){
		$('tr').eq( snakeCells[cell][0] ).find('td').eq(snakeCells[cell][1]).addClass('snakeCell');
	}
	$('tr').eq( snakeHead[0] ).find('td').eq(snakeHead[1]).addClass('snakeHead');
}
//Náhodná pozícia ovocia
function getFruitCell() {
	fruitCell = [ getRandomNumber( $( 'tr' ).length ), getRandomNumber( $( 'tr:eq(0)>td' ).length ) ];
}
	function gameOver() {
	$('div.gameOver').show('fast', function() {
		$( this ).animate({top:250}, 'slow');
	});
	clearInterval( ticker );
}
//Prekreslovanie pozície hadíka
function updateSnakeCell(){
	var snakeNewHead = [];
	//Zistenie smeru pohybu hadíka
	switch(direction){
		case 'vpravo':
			snakeNewHead = [ snakeHead[0], snakeHead[1]+1 ];
			break;
		case 'vlavo':
			snakeNewHead = [ snakeHead[0], snakeHead[1]-1 ];
			break;
		case 'hore':
			snakeNewHead = [ snakeHead[0]-1, snakeHead[1] ];
			break;
		case 'dole':
			snakeNewHead = [ snakeHead[0]+1, snakeHead[1] ];
			break;
	}
	var newCell = {length:0}
	//Narazil do lavej alebo hornej steny ?
	if( snakeNewHead[0] < 0 || snakeNewHead[1] < 0 ) {
		gameOver();
		return;
	} else if( snakeNewHead[0] >= size || (snakeNewHead[1] -3) >= size ) {//Narazil do pravej alebo dolnej steny
		gameOver();
		return;
	}
	//Zistovanie dalsej bunky kde pojde hadík
	var newCell = $('tr').eq( snakeNewHead[0] ).find('td').eq(snakeNewHead[1]);
	
	if( newCell.length == 0 ) {
		gameOver();
	} else {//Narazil do seba ?
		if ( newCell.hasClass('snakeCell') ) {
			gameOver();
		} else {
			if( newCell.hasClass( 'fruitCell' ) ) {
				snakeCells.push( [] );
				getFruitCell();
				renderFruitCell();
				score += 100;
				$( '#scoreBoard' ).html( 'Hráč 1 : ' + score + ' Hráč 2 : ' + score2+ ' ' );
				speed = speed - 10 > 5 ? speed - 3 : speed;
				clearInterval( ticker );
				startGame();
			}
			for( var i = ( snakeCells.length - 1 ); i > 0 ; i-- ) {
				snakeCells[ i ] = snakeCells[ i - 1 ];
			}
			snakeCells[ 0 ] = snakeHead = snakeNewHead;
			renderSnake();
		}
	}
}
	function getRandomNumber( limit ) {
	return parseInt( Math.random() * limit % limit );
}

//Zistovanie nového smeru hada a a zmena na tento smer
function getNewDirection( keyCode ) {
	var codes = {
		37 : 'vlavo',
		38 : 'hore',
		39 : 'vpravo',
		40 : 'dole'
	};
		if( typeof codes[ keyCode ] != 'undefined' ) {
			var newDirection = codes[ keyCode ], changeDirection = true;
			switch( direction ) {
				case 'hore' :
					changeDirection = newDirection != 'dole';
					break;
				case 'dole' :
					changeDirection = newDirection != 'hore';
					break;
				case 'vpravo' :
					changeDirection = newDirection != 'vlavo';
					break;
				case 'vlavo' :
					changeDirection = newDirection != 'vpravo';
					break;
		}
		direction = changeDirection ? newDirection : direction;
	}
}

//Vykreslenie hracej plochy
function renderBoard() {
	var rowhtml = '';
	for( var i = 0; i < size; i++ ) {
		rowhtml +='<td cellpadding="0" cellspacing="0"></td>'
	}
	html = [];
	for( var i = 0; i < size; i++ ) {
		html.push( '<tr cellpadding="0" cellspacing="0">' + rowhtml + '</tr>' );
	}
	$( document.body ).append( '<table>' + html.join( '\n' ) + '</table>' );
	getFruitCell();
}


//Vykreslenie ovocia
function renderFruitCell() {
	$( 'td' ).removeClass( 'fruitCell' );
	$('tr').eq( fruitCell[0] ).find('td').eq(fruitCell[1]).addClass( 'fruitCell' );
}
//Dá pokyn na začatie hry
function startGame() {
	ticker = setInterval( updateSnakeCell, speed );
	ticker = setInterval( updateSnakeCell2, speed2 );
}
//Ako keby main v céčku :D
$( document ).ready(function(){
	renderBoard();
	renderFruitCell();
	$( document ).bind('keydown', function( e ) {
		getNewDirection( e.keyCode );
		getNewDirection2( e.keyCode );
	});
	startGame();
	
});