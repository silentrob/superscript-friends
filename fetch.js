
var request = require('request')
var fs = require("fs")
var rootURL = "http://home.versatel.nl/friendspic0102/transcripts/html/";

var pad  = function(n) {
  return (n < 10)? "0" + n : n;
}

for (var s = 1; s <= 10; s++) {
  for (var e = 1; e <= 24; e++) {
    request(rootURL + pad(s) + pad(e)+".html", function(err, res, body){
      if (res.statusCode == 200) {
        var name = res.request.path.split("/").pop()
        fs.writeFileSync("./raw/"+ name, body);    
      }
    });
    
  }
}

