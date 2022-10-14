/**
 * return a JSON document listing summary statistics on the no. of options in all registered polls
 * curl -X GET "http://vodle:none@localhost:5984/vodle/_design/vodle_lists/_list/pid_nooid__1/vodle_views/pid_nooid__1?group_level=1"
 */
function (head, req) {
  const headers = {'Content-Type': 'application/json'};
  let sum0 = 0, sum1 = 0, sum2 = 0, sum3 = 0, min = 1e10, max = 0;
  start({'headers': headers});
  while(row = getRow()) {
    const v = row.value[0];
    sum0++;
    sum1 += v;
    sum2 += v**2;
    sum3 += v**3;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  let mean = sum1/sum0, stddev = Math.sqrt(sum2 / sum0 - mean**2);
  send(JSON.stringify({
    n: sum0, 
    mean: mean, 
    stddev: stddev, 
    skew: (sum3 / sum0 - 3 * mean * stddev**2 - mean**3) / stddev**3, 
    min: min, 
    max: max
  }));
}
