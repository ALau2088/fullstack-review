const request = require('request');
const config = require('../config.js');
const mongoose = require('../database/index')

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/search/repositories?q=user:${username}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, function(err, httpResponse, body){
    if (err) {
      return console.log(err);
    }
    // console.log('Upload successful! Server responded with:', body);
    const json = JSON.parse(body)
    for (var i = 0; i < json.items.length; i++){
      mongoose.save(json.items[i])
    }
  })
}

module.exports.getReposByUsername = getReposByUsername;