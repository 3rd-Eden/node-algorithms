// see http://en.wikipedia.org/wiki/Soundex
exports.soundex = function( string ){
	string = string.toUpperCase();
	
	// soundex information
	var map = {	BFPV: 1, CGJKQSXZ: 2, DT: 3, L: 4, MN: 5, R: 6 },
		keys = [ 'BFPV', 'CGJKQSXZ', 'DT', 'L', 'MN', 'R' ],
		soundx = [ string[0], 0, 0, 0 ],
		
		// storage variables
		i = 1, s = 0, j, key, code, length = string.length;
		
		for(; i < length; i++ ){
			j = keys.length;
			while( s != 3 && j-- ){
				if( keys[j].search( string[i] ) !== -1 ){
					code = map[ keys[j] ];
					if( code != soundx[ s ] )
						soundx[ ++s ] += code;
				}
			}
		}
		
		return soundx.join( '' );
};

// see http://en.wikipedia.org/wiki/Bisection_method
exports.bisect = exports.bisectRight = function( array, x, low, high ){
	
	// The low and high bounds the inital slice of the array that needs to be searched
	// this is optional
	low = low || 0;
	high = high || array.length;
	
	var mid;
	
	while( low < high ){
		mid = Math.floor( ( low + high ) / 2 );
		
		if( x < array[ mid ] )
			high = mid;
		else 
			low = mid + 1;
	}
	
	return low;
};