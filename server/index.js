const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github')
const request = require('request');
const config = require('../config.js');

app.use(express.static(__dirname + '/../client/dist'));

// Middleware
app.use(bodyParser.urlencoded({extended: true}))

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  getReposByUsername.getReposByUsername(req.body.username);

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  let options = {
    url: 'https://api.github.com/search/repositories?q=tetris&sort=stars&per_page=25',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, function(err, httpResponse, body){
    if (err) {
      return console.log(err);
    }
    console.log('Upload successful! Server responded with:', JSON.parse(body).items.length);
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

