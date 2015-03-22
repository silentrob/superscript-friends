var _ = require("underscore");
var rach = require("./transcripts/rachel.json");


var triggerSet = [];
for(var i = 0; i < rach.length;i++) {
  var trig = rach[i].trigger;
  var reply = rach[i].reply;
  if (!triggerSet.hasOwnProperty(trig)) {
    triggerSet[trig] = [reply];
  } else {
    triggerSet[trig].push(reply)
  }
}

for (var key in triggerSet) {
  // if (triggerSet[key].length) {
    console.log("+",  key);
    console.log(triggerSet[key])
  // }
}

