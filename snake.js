
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
//Premenné
var direction = 'vpravo', speed = 100, ticker = null, fruitCell = [], score = 0, size = 55;

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
				$( '#scoreBoard' ).html( 'Skóre : ' + score );
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
}
//Ako keby main v céčku :D
$( document ).ready(function(){
	renderBoard();
	renderFruitCell();
	$( document ).bind('keydown', function( e ) {
		getNewDirection( e.keyCode );
	});
	startGame();
});