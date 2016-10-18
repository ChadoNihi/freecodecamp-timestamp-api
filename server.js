const express = require('express'),
      stylus = require('stylus'),
      nib = require('nib'),
      app = express(),
      compile = (str, path)=> {
          return stylus(str)
            .set('filename', path)
            .use(nib());
}

app.set( 'port', ( process.env.PORT || 5000 ));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(stylus.middleware(
    { src: __dirname + '/public'
    , compile: compile
    }
));
app.use(express.static(__dirname + '/public'));

      
      
app.get('/', function (req, res) {
    res.render('index', { fullUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
                            title: 'Instructions | Timestamp App'});
});

app.get('/:timeStr', function (req, res) {
    var date = new Date(parseInt(req.params.timeStr) || unescape(req.params.timeStr)),
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



app.listen(app.get( 'port' ), function () {
  console.log('The timestamp app is listening on port '+app.get( 'port' )+'!');
});