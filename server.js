const express = require('express'),
      stylus = require('stylus'),
      nib = require('nib'),
      port = 8080,
      app = express();
      
function compile(str, path) {
    return stylus(str)
     .set('filename', path)
     .set('compress', true)
     .use(nib())
     .import('nib');
}
      
app.middleware({
     src: __dirname + '/stylesheets'
    , dest: __dirname + '/public'
    , compile: compile
})
      
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
        result = {dateString: null, unixTime: null};
    }
    
    res.send(result);
});

app.listen(port, function () {
  console.log('The timestamp app is listening on port '+port+'!');
});