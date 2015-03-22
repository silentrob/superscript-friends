var fs = require("fs");
var readline = require('readline');
var Tokenizer = require('sentence-tokenizer');

var results = [];

var rd = readline.createInterface({
    input: fs.createReadStream('./transcripts/friends.txt'),
    output: process.stdout,
    terminal: false
});

var prevLine = "";
rd.on('line', function(line) {
  var parts = line.split(":");
  var speaker = parts[0].trim().toLowerCase();
  
  if(parts.length === 2) {
    var utterance = clean(parts[1].trim());
    if (utterance.length != 0) {
      if (speaker == "rachel") {
        results.push({trigger:prevLine, reply: utterance});
      }      
    }

    

    // Could be anyone
    if (utterance.length != 0) {
      var tokenizer = new Tokenizer();
      tokenizer.setEntry(utterance);
      var sentences = tokenizer.getSentences();
      if (sentences.length != 1) {
        prevLine = sentences.pop();
      } else {
        prevLine = utterance;
      }

    }
  }
});

var triggerSet = {};
rd.on('close', function(){
  fs.writeFileSync("./transcripts/rachel.json", JSON.stringify(results))
})

var clean = function(msg) {
  msg = msg.replace(new RegExp("\t", "g"), " ");
  msg = msg.replace(/\s+/g, " ");
  msg = msg.replace(/(’|‘)/g, "'");
  msg = msg.replace(/(“|”)/g, '"');
  msg = msg.replace(/(–|—)/g, "—");
  msg = msg.replace(/[^\x00-\x7F]/g, "");
  msg = msg.replace(/\.\.\./g, ".");
  msg = msg.replace(/'s/g, " is");
  msg = msg.replace(/'m/g, " am");
  msg = msg.replace(/I'd/g, "I would");
  msg = msg.replace(/don't/g, "do not");
  msg = msg.replace(/can't/g, "can not");
  msg = msg.replace(/did't/g, "did not");
  msg = msg.replace(/you're/g, "you are");
  msg = msg.replace(/wasn't/g, "was not");
  msg = msg.replace(/wouldn't/g, "would not");
  msg = msg.replace(/I've/g, "I have");

  return msg;
}

