/**
 * Calculates the soundex of a given string
 * @param {String} string the String that needs to be converted to a soundex value.
 * @return {String} the soundex of the string
 */
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

/**
 * Calculates the index of the Array where item X should be placed, assuming the Array is sorted.
 * @param {Array} array The array containing the items.
 * @param {int} x The item that needs to be added to the array.
 * @param {int} low Inital Index that is used to start searching, optional.
 * @param {int} high The maximum Index that is used to stop searching, optional.
 * @return {int} the index where item X should be placed
 */
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

/**
 * Calculates the index of the Array where item X should be placed, assuming the Array is sorted.
 * @param {Array} array The array containing the items.
 * @param {int} x The item that needs to be added to the array.
 * @param {int} low Inital Index that is used to start searching, optional.
 * @param {int} high The maximum Index that is used to stop searching, optional.
 * @return {int} the index where item X should be placed
 */
exports.bisectLeft = function( array, x, low , high ){
	
	// The low and high bounds the inital slice of the array that needs to be searched
	// this is optional
	low = low || 0;
	high = high || array.length;
	
	var mid;
	
	while( low < high ){
		mid = Math.floor( ( low + high ) / 2 );
		
		if( x < array[ mid ] )
			low = mid + 1;
		else 
			high = mid;
	}
	
	return low;
};



/**
 * Creates array ranges or applies padding to an array.
 * @param {Array} array The array that needs the padding.
 * @param {int} size The amount of padding needs to be added to the array.
 * @param {int} value The value that is used for the padding, optional. If omitted the padding index is used. 
 * @return {Array} The array with padding applied. 
 */
var range = function( array, size, value ){
	var length = Math.abs( size ) - array.length, i = 0;
    if( length <= 0 )
      return array;
	
	for(; i <= length; i++ )
		size < 0 ? array.unshift( value || i ) : array[ array.length ] = value || i;
    
    return array;
};

/**
 * Calculates the Levenshtein distance between a and b.
 * @param {String} a Item 1.
 * @param {String} b Item 2.
 * @return {int} the distance.
 */
exports.levenshtein = function( a, b ){
	if( a === b ) return 0;
	
	var a_len = a.length, b_len = b.length, tmp;
	
	if( a_len === 0 ) return b_len;
	if( b_len === 0 ) return a_len;
	
	// make sure a_len <= b_len
	if( a_len > b_len ){
		tmp = a_len;
		a_len = b_len; b_len = tmp;
		
		tmp = a;
		a = b;	b = tmp;
	}
	
	var current = range( [], a_len + 1),
		b_loop = b_len + 1,
		a_loop,	previous, adds, changes, deletes, min,
		i = 1,j;
	
	for(; i < b_loop; i++ ){
		previous = current;
		current = range( [i], a_len, 0 );
		
		for( j = 1, a_loop = a_len + 1; j < a_loop; j++ ){
			adds = previous[ j ] + 1;
			deletes = current[ j-1 ] + 1;
			changes = previous[ j-1 ];
			
			if( a[j-1] != b[i-1] )
				changes = changes + 1;
			
			if( adds < deletes && adds < changes )
				min = adds;
			else if( deletes < adds && deletes < changes )
				min = deletes;
			else
				min = changes;
			
			current[ j ] = min;
		}
	}
	
	return current[ a_len ]
	
};

/* 
 * The following functions are Copyright (c) 2009 Nicholas C. Zakas 
 * LICENSED: http://github.com/3rd-Eden/node-algorithms/licenses/NCZAKAS
 *  
 * bubbleSort: http://github.com/nzakas/computer-science-in-javascript/blob/master/algorithms/sorting/bubble-sort/bubble-sort-2.js
 */
 
/**
 * Swaps two values in an array.
 * @param {Array} items The array containing the items.
 * @param {int} firstIndex Index of first item to swap.
 * @param {int} secondIndex Index of second item to swap.
 * @return {void}
 */
var swap = function(items, firstIndex, secondIndex ){
    var temp = items[ firstIndex ];
    items[ firstIndex ] = items[ secondIndex ];
    items[ secondIndex ] = temp;
};

/**
 * A bubble sort implementation in JavaScript. The array
 * is sorted in-place. This uses two reversed loops that
 * count down instead of counting up.
 * @param {Array} items An array of items to sort.
 * @return {Array} The sorted array.
 */
exports.bubbleSort = function(items){
    var len = items.length,
        i = len-1, j;

    for( ; i >= 0; i-- )
        for( j=len-i; j >= 0; j-- )
            if( items[j] < items[j-1] )
                swap(items, j, j-1);
            
    return items;
};