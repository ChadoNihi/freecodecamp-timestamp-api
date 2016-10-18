const express = require('express'),
      port = 8080,
      app = express();
      
app.set('view engine', 'pug');
      
app.get('/', function (req, res) {
    res.render('index', { fullUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
                            title: 'Instructions | Timestamp App'});
});

app.get('/:timeStr', function (req, res) {
    var date = new Date(req.params.timeStr),
        result;
    
    if (Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime())) {
        result = {
            dateString: date.toDateString(),
            unixTime: date.getTime()
        };
    } else {
        //res.statusCode = 400;
        result = {};
    }
    
    res.send(result);
});

app.listen(port, function () {
  console.log('The timestamp app is listening on port '+port+'!');
});