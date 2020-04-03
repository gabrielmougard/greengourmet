export function detectionThreshold(array) {
    // To return a valid decoded barcode, we should find at least 5 identical elements. It increases reliability.
    // We could also use the longest identical elements subsequence.
    const THRESHOLD = 5;

    let hash = new Object() 
    for (var i = 0; i < array.length; i++) {
        if (hash.hasOwnProperty(array[i])) {
            hash[array[i]] += 1
        } else {
            hash[array[i]] = 1
        }
    }
    // find the max frequency 
    let max_count = 0
    let res = -1
    for (var k in hash) {
        if (max_count < hash[k]) {
            res = k
            max_count = hash[k]
        }     
    }  

    if (max_count < THRESHOLD) { // we don't have enough identical elements
        return false
    }
          
    return res 

}