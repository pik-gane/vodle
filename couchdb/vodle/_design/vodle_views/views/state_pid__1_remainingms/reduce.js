/**
 * elementwise sum
 */
function(keys, values) {
    let sum = values[0], k = sum.length;
    for (let i=1; i<values.length; i++) {
        for (let j=0; j<k; j++) {
            sum[j] += values[i][j];
        }
    }
    return sum;
}
  