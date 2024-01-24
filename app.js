const canvas = document.createElement( 'canvas' ),
	  ctx = canvas.getContext( '2d' );
	  canvas.width = 600;
	  canvas.height = 600;
	  document.body.appendChild( canvas );

let cells = [];

( function init() {

	ctx.scale( 3, 3 );
	ctx.fillStyle = 'white';
	ctx.fillRect( 0, 0, 200, 200 );

	for ( let i = 0; i < 200; i++ ) {
		cells[i] = [];
		for ( let j = 0; j < 200; j++ ) {
			cells[i][j] = Math.random().toFixed(2);
			if ( cells[i][j] ) {
				ctx.fillStyle = `hsl(${cells[i][j]*60}, 100%, ${cells[i][j]*100}%)`;
				ctx.fillRect( i, j, 1, 1 );
			}
		}
	}

	run();
} )();

function gaussian( value ) {
    let curve_center = 4;
    let curve_width = 0.88;

    return Math.exp( -Math.pow( parseFloat( ( value ).toFixed( 2 ) ) - curve_center, 2 ) / ( 2 * Math.pow( curve_width, 2 ) ) );
}

function run() {

	const cells_copy = JSON.parse( JSON.stringify( cells ) );

	for ( let i = 0; i < 200; i++ ) {
		for ( let j = 0; j < 200; j++ ) {

			let neighbors_value = 0;
				neighbors_value += parseFloat( cells_copy[i==199?0:i+1][j] );
				neighbors_value += parseFloat( cells_copy[i==0?199:i-1][j] );
				neighbors_value += parseFloat( cells_copy[i][j==199?0:j+1] );
				neighbors_value += parseFloat( cells_copy[i][j==0?199:j-1] );
				neighbors_value += parseFloat( cells_copy[i==199?0:i+1][j==199?0:j+1] );
				neighbors_value += parseFloat( cells_copy[i==0?199:i-1][j==0?199:j-1] );
				neighbors_value += parseFloat( cells_copy[i==199?0:i+1][j==0?199:j-1] );
				neighbors_value += parseFloat( cells_copy[i==0?199:i-1][j==199?0:j+1] );

			cells[i][j] = gaussian( neighbors_value );

			ctx.fillStyle = `hsl(${cells[i][j]*60}, 100%, ${cells[i][j]*100}%)`;
			ctx.fillRect( i, j, 1, 1 );

		}
	}

	setTimeout( run, 30 );
}