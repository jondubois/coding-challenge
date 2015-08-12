var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(function (error, req, res, next) {
  // Handle json error
  var errorMessage = JSON.stringify({'error': 'Could not decode request: JSON parsing failed'});
  res.writeHead(400, {
    'Content-Type': 'application/json',
    'Content-Length': errorMessage.length
  });
  res.end(errorMessage);
});

app.post('/', function (req, res) {
  var filteredList = req.body.payload.filter(function (show) {
    return show.drm && show.episodeCount > 0;
  })
  .map(function (show) {
    return {
      image: show.image ? show.image.showImage : null,
      slug: show.slug,
      title: show.title
    };
  });
  
  res.end(JSON.stringify({response: filteredList}));
});

app.listen(80);