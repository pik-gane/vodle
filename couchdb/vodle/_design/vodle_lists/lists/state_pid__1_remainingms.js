/**
 * return a JSON document listing no. of polls and avg. remaining days by state
 * curl -X GET "http://vodle:none@localhost:5984/vodle/_design/vodle_lists/_list/state_pid__1_remainingms/vodle_views/state_pid__1_remainingms?group_level=1"
 */
function (head, req) {
  const headers = {'Content-Type': 'application/json'};
  let result = {};
  start({'headers': headers});
  while(row = getRow()) {
    const v = row.value;
    result[row.key] = {n:v[0], avg_remaining_days:v[1]/v[0]/1000/60/60/24} 
  }
  send(JSON.stringify(result));
}
