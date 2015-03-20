// Clean up the raw input
var fs = require("fs");
var cheerio = require('cheerio');

var pad  = function(n) {
  return (n < 10)? "0" + n : n;
}

var lines = [];

for (var s = 1; s <= 10; s++) {
  for (var e = 1; e <= 24; e++) {

    try {
      var ep1 = fs.readFileSync("./raw/" + pad(s)+ pad(e) + ".html");
      
      $ = cheerio.load(ep1);
      $('p').each(function(i, elem) {
        var line = $(this).text();
        var line = line.replace(/\n/g, "");
        var line = line.replace(/\[.*\]/g, "");
        var line = line.replace(/\(.*\)/g, "");
        
        if (line.length > 1)
          lines.push(line);
      });
    } catch(e) {
    }
  }
}

// One big File 
fs.writeFileSync("./transcripts/friends.txt", lines.join("\n"))